// import { useLoadScript } from "@react-google-maps/api"

import { useRouter } from "next/router"
import { useState, useEffect } from "react"

// import { PlacesContext } from "../lib/context"
import { Address, Coord } from "../../utils/types"
import { Filters as FiltersType, Post } from "../../utils/types"
import Map from "../../Components/app/Map"
import Sidebar from "../../Components/app/Sidebar"
import Navbar from "../../Components/app/Navbar"
import { InferGetServerSidePropsType, GetServerSideProps, NextPage } from "next"

const Home: NextPage = ({
  province,
  services,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter()
  const [posts, setPosts] = useState<Post[]>([])
  // TODO: Change coordinates to address
  const [coordinate, setCoordinate] = useState<Coord>({
    lat: 13.7563,
    lng: 100.5018,
  })
  const [filters, setFilters] = useState<FiltersType>({
    province,
    typeOfService: services,
  })
  const [zoomLv, setZoomLv] = useState(11)
  // const [bounds, setBounds] = useState(null)
  const [drawingMap, setDrawingMap] = useState(false)
  const [childClick, setChildClick] = useState(null)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinate({ lat: latitude, lng: longitude })
      }
    )
    setZoomLv(11)
  }, [])

  useEffect(() => {
    const newQuery = {
      province: filters.province,
      type: Object.keys(filters.typeOfService),
    }

    // check if query objects are same
    if (
      router.query.province !== newQuery.province ||
      router.query.type !== newQuery.type
    ) {
      router.push({
        pathname: "/main/",
        query: {
          ...router.query,
          province: filters.province,
          type: Object.keys(filters.typeOfService),
        },
      })
    }
  }, [filters])

  // Load google map script
  // const { isLoaded } = useLoadScript({
  //   googleMapsApiKey: "AIzaSyCI_-E-iNpc2Lp2L9cjonh2p9MX-bcp85g",
  //   libraries: ["places", "drawing", "geometry"],
  // })

  // if (!isLoaded) return <div>Loading . . . </div>

  console.log("Mainposts", posts)
  return (
    <>
      <Navbar
        setCoordinate={setCoordinate}
        drawingMap={drawingMap}
        setDrawingMap={setDrawingMap}
      />
      <main className='h-[92vh] flex'>
        <div className='w-[40%]'>
          <Sidebar
            posts={posts}
            setPosts={setPosts}
            setCoordinate={setCoordinate}
            province={province}
            filters={filters}
            setFilters={setFilters}
            childClick={childClick}
            drawingMap={drawingMap}
          />
        </div>
        <div className='w-[60%]'>
          <Map
            posts={posts}
            coordinate={coordinate}
            setCoordinate={setCoordinate}
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { province, services } = context.query

  const typeOfService = {
    Vacant_Land: false,
    Real_Estate: false,
    Property: false,
    Condomidium: false,
    Service: false,
    Product: false,
  }

  if (services) {
    ;(services as string).split(",").forEach((service) => {
      typeOfService[service as keyof typeof typeOfService] = true
    })
  } else {
    typeOfService["Vacant_Land"] = true
    typeOfService["Real_Estate"] = true
    typeOfService["Property"] = true
    typeOfService["Condomidium"] = true
    typeOfService["Service"] = true
    typeOfService["Product"] = true
    // typeOfService['Real_Estate'] = true,  typeOfService['Property'] = true, typeOfService['Service'] = true
  }

  return {
    props: {
      province: "Bangkok",
      services: typeOfService,
    },
  }
}
export default Home
