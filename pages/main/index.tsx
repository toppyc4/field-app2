import { useLoadScript } from "@react-google-maps/api"

import { useRouter } from "next/router"
import { useState, useEffect } from "react"

// import { PlacesContext } from "../lib/context"
import { Address } from "../../utils/types"
import { Filters as FiltersType } from "../../utils/types"
import Map from "../../Components/app/Map"
import Sidebar from "../../Components/app/Sidebar"
import Navbar from "../../Components/app/Navbar"
import { InferGetServerSidePropsType, GetServerSideProps, NextPage } from "next"

const Home: NextPage = ({
  address: initialAddresses,
  province,
  services,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter()
  const posts = null
  // TODO: Change coordinates to address
  const [address, setAddress] = useState<Address>(initialAddresses)

  const [filters, setFilters] = useState<FiltersType>({
    province,
    typeOfService: services,
  })
  const [zoomLv, setZoomLv] = useState(11)
  // const [bounds, setBounds] = useState(null)
  const [drawingMap, setDrawingMap] = useState(false)
  const [childClick, setChildClick] = useState(null)

  // TODO: navigate to user current possition
  // useEffect(() => {
  //   navigator.geolocation.getCurrentPosition(
  //     ({ coords: { latitude, longitude } }) => {
  //       setCoordinates({ lat: latitude, lng: longitude })
  //     }
  //   )
  //   setZoomLv(11)
  // }, [])

  useEffect(() => {
    const newQuery = {
      address: address.place_id,
      type: Object.keys(filters.typeOfService),
    }

    // check if query objects are same
    if (
      router.query.address !== newQuery.address ||
      router.query.type !== newQuery.type
    ) {
      router.push({
        pathname: "/main",
        query: {
          ...router.query,
          address: address.place_id,
          type: Object.keys(filters.typeOfService),
        },
      })
    }
  })

  // Load google map script
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyCI_-E-iNpc2Lp2L9cjonh2p9MX-bcp85g",
    libraries: ["places", "drawing", "geometry"],
  })

  if (!isLoaded) return <div>Loading . . . </div>
  console.log("Mainposts", posts)
  return (
    <>
      <Navbar
        setAddress={setAddress}
        drawingMap={drawingMap}
        setDrawingMap={setDrawingMap}
      />
      <main className='h-[92vh] flex'>
        <div className='w-[40%]'>
          <Sidebar
            posts={posts}
            setAddress={setAddress}
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
            address={address}
            setAddress={setAddress}
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
  const { address, province, services } = context.query

  const typeOfService = {
    Vacant_Land: false,
    Real_Estate: false,
    Property: false,
    Service: false,
  }

  if (services) {
    ;(services as string).split(",").forEach((service) => {
      typeOfService[service as keyof typeof typeOfService] = true
    })
  } else {
    typeOfService["Vacant_Land"] = true
    // typeOfService['Real_Estate'] = true,  typeOfService['Property'] = true, typeOfService['Service'] = true
  }

  return {
    props: {
      address: address
        ? (address as string)
        : [
            {
              formatted_address: "",
            },
          ],
      province: "Bangkok",
      services: typeOfService,
    },
  }
}
export default Home
