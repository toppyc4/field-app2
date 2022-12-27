import { InferGetServerSidePropsType, GetServerSideProps, NextPage } from "next"
import { useState, useEffect, useRef } from "react"

import { Coord, Filters as FiltersType, Post, Address } from "../../utils/types"
import Map from "../../components/app/Map"
import Sidebar from "../../components/app/Sidebar"
import Navbar from "../../components/app/Navbar"

import {
  getPostsWithProvince,
  postToJSON,
  firestore,
} from "../../lib/firebaseConfig"
import {
  query,
  collection,
  where,
  getDocs,
  limit,
  orderBy,
  getFirestore,
} from "firebase/firestore"

const HomeProvincePage: NextPage = ({
  services,
  posts,
  province,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [address, setAddress] = useState<Address>({
    formatted_address: "",
    coords: { lat: 13.7563, lng: 100.5018 },
  })
  const [filters, setFilters] = useState<FiltersType>({
    province: province.province,
    typeOfService: services,
  })
  const [drawingMap, setDrawingMap] = useState(false)
  const [selectedMarker, setSelectedMarker] = useState<Post | null>(null)
  const itemsRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef(null)

  const getProvinceCoord = async (
    // this function is only allow to run with province in string type
    province: string | null
  ) => {
    const response = await fetch("/api/autocomplete2/" + province)
    const data = await response.json()
    const provinceCoord = data.candidates[0].geometry.location
    const provinceAddrs = data.candidates[0].formatted_address
    setAddress({ formatted_address: provinceAddrs, coords: provinceCoord })
    console.log("getProvinceCoord")
  }

  // can cause weird coordinate
  useEffect(() => {
    console.log("address.coords: ", address.coords)
    console.log("province.coordinate: ", province.coordinate)
    if (address.coords != province.coordinate) {
      getProvinceCoord(province.province)
    }
  }, [province])

  //   useEffect(() => {
  //     const newQuery = {
  //       type: Object.keys(filters.typeOfService),
  //     }

  //     // check if query objects are same
  //     if (router.query.type !== newQuery.type) {
  //       router.push({
  //         pathname: `/main/${filters.province}/`,
  //         query: {
  //           ...router.query,
  //           type: Object.keys(filters.typeOfService),
  //         },
  //       })
  //     }
  //   }, [filters])

  console.log("[HomeProvincePage] posts: ", posts)
  console.log("[HomeProvincePage] province: ", province)

  return (
    <>
      <Navbar
        address={address}
        setAddress={setAddress}
        drawingMap={drawingMap}
        setDrawingMap={setDrawingMap}
        mapRef={mapRef}
      />
      <main className='h-[92vh] flex relative'>
        <div className='w-[40%]'>
          <Sidebar
            posts={posts}
            setAddress={setAddress}
            filters={filters}
            setFilters={setFilters}
            selectedMarker={selectedMarker}
            setSelectedMarker={setSelectedMarker}
            drawingMap={drawingMap}
            // itemsRef={itemsRef}
          />
        </div>
        <div className='w-[60%]'>
          <Map
            posts={posts}
            address={address}
            setAddress={setAddress}
            drawingMap={drawingMap}
            selectedMarker={selectedMarker}
            setSelectedMarker={setSelectedMarker}
            mapRef={mapRef}
            // itemsRef={itemsRef}
          />
        </div>
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { services } = context.query
  //@ts-ignore
  let { province } = context.params

  // @ts-ignore
  const provinceDocs = await getPostsWithProvince(province)

  // JSON serializable data
  let posts = null

  const typeOfService = {
    vacant_land: false,
    real_estate: false,
    property: false,
    condomidium: false,
    service: false,
    product: false,
  }

  if (services) {
    ;(services as string).split(",").forEach((service) => {
      typeOfService[service as keyof typeof typeOfService] = true
    })

    if (provinceDocs) {
      province = provinceDocs.data()

      const postQuery = query(
        collection(getFirestore(), provinceDocs.ref.path, "posts"),
        where("published", "==", true),
        orderBy("createdAt", "desc"),
        limit(30)
      )
      posts = (await getDocs(postQuery)).docs.map(postToJSON)
    } else {
      console.log("all service is actived but have problem querying data")
    }
  } else {
    typeOfService["vacant_land"] = true
    typeOfService["real_estate"] = true
    typeOfService["property"] = true
    typeOfService["condomidium"] = true
    typeOfService["service"] = true
    typeOfService["product"] = true
  }

  const types = Object.keys(typeOfService)
  const activeTypes = types.filter((id) => {
    return typeOfService[id as keyof typeof typeOfService]
  })

  if (provinceDocs && activeTypes.length == 6) {
    // this cause the province to turn into object error
    province = provinceDocs.data()

    const postQuery = query(
      collection(getFirestore(), provinceDocs.ref.path, "posts"),
      where("published", "==", true),
      orderBy("createdAt", "desc"),
      limit(30)
    )
    posts = (await getDocs(postQuery)).docs.map(postToJSON)
  } else if (provinceDocs && activeTypes.length !== 6) {
    const postQuery = query(
      collection(getFirestore(), provinceDocs.ref.path, "posts"),
      where("published", "==", true),
      where("typeOfService", "in", activeTypes),
      orderBy("createdAt", "desc"),
      limit(30)
    )
    posts = (await getDocs(postQuery)).docs.map(postToJSON)
  }

  return {
    props: {
      posts,
      services: typeOfService,
      province,
    },
  }
}
export default HomeProvincePage
