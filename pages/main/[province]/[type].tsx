import { useState, useEffect } from "react"
import { useRouter } from "next/router"

// import { PlacesContext } from "../lib/context"
import Map from "../../../Components/app/Map"
import Sidebar from "../../../Components/app/Sidebar"
import Navbar from "../../../Components/app/Navbar"
import { Post, TypeOfService } from "../../../utils/types"

import {
  getPostsWithProvince,
  postToJSON,
  firestore,
} from "../../../lib/firebaseConfig"
import {
  query,
  collection,
  where,
  getDocs,
  limit,
  orderBy,
  getFirestore,
} from "firebase/firestore"

import { useLoadScript } from "@react-google-maps/api"

export default function HomeByProvinceAndType({ posts, province, type }: {posts: Post[] | null; province: any; type: TypeOfService}) {
  const router = useRouter()
  const [coordinates, setCoordinates] = useState({
    lat: 13.7563,
    lng: 100.5018,
  })
  const [zoomLv, setZoomLv] = useState(11)
  // const [bounds, setBounds] = useState(null)
  const [drawingMap, setDrawingMap] = useState(false)
  const [childClick, setChildClick] = useState(null)

  useEffect(() => {
    setCoordinates({
      lat: province.coordinate.lat,
      lng: province.coordinate.lng,
    })
    setZoomLv(11)
  }, [])

  // Load google map script
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyCI_-E-iNpc2Lp2L9cjonh2p9MX-bcp85g",
    libraries: ["places", "drawing", "geometry"],
  })

  if (!isLoaded) return <div>Loading . . . </div>

  console.log("posts", posts)
  console.log("router", router)

  return (
    <>
      <Navbar
        drawingMap={drawingMap}
        setDrawingMap={setDrawingMap}
        setCoordinates={setCoordinates}
      />
      <main className='h-[90vh] flex'>
        <div className='w-[40%]'>
          <Sidebar
            posts={posts}
            province={province}
            type={type}
            childClick={childClick}
            setCoordinates={setCoordinates}
            drawingMap={drawingMap}
            // setDrawingMap={setDrawingMap}
          />
        </div>
        <div className='w-[60%]'>
          <Map
            posts={posts}
            coordinates={coordinates}
            setCoordinates={setCoordinates}
            zoomLv={zoomLv}
            setZoomLv={setZoomLv}
            // setBounds={setBounds}
            drawingMap={drawingMap}
            setChildClick={setChildClick}
          />
        </div>
      </main>
    </>
  )
}

export async function getServerSideProps(context: any) {
  const { params } = context
  let { province, type } = params
  const provinceDocs = await getPostsWithProvince(province)

  //   console.log("paramsSSP", params)
  //   console.log("provinceSSP", province)
  //   console.log("typeSSP", type)
  // If no user, short circuit to 404 page
  if (!provinceDocs) {
    return { notFound: true }
  }

  // JSON serializable data
  // let user = null
  let posts = null

  if (provinceDocs) {
    province = provinceDocs.data()

    if (type !== "all") {
      const postQuery = query(
        collection(getFirestore(), provinceDocs.ref.path, "posts"),
        where("published", "==", true),
        where("typeOfService", "==", type),
        orderBy("createdAt", "desc"),
        limit(10)
      )
      posts = (await getDocs(postQuery)).docs.map(postToJSON)
    } else if (type === "all") {
      const postQuery = query(
        collection(getFirestore(), provinceDocs.ref.path, "posts"),
        where("published", "==", true),
        orderBy("createdAt", "desc"),
        limit(10)
      )
      posts = (await getDocs(postQuery)).docs.map(postToJSON)
    }
  }
  return {
    props: { posts, province, type }, // will be passed to the page component as props
  }
}
