import { NextPage } from "next"
import { useState, useEffect } from "react"

import { Coord, Filters as FiltersType, Post, Address } from "../../utils/types"
import Map from "../../Components/app/Map"
import Navbar from "../../Components/app/Navbar"
import Sidebar from "../../Components/app/Sidebar"

const Home: NextPage = () => {
  const [address, setAddress] = useState<Address>({
    formatted_address: "",
    coords: { lat: 13.7563, lng: 100.5018 },
    place_id: undefined,
  })
  const [filters, setFilters] = useState<FiltersType>({
    province: null,
    typeOfService: {
      vacant_land: false,
      real_estate: false,
      property: false,
      condomidium: false,
      service: false,
      product: false,
    },
  })
  const [zoomLv, setZoomLv] = useState(11)

  const [drawingMap, setDrawingMap] = useState(false)
  const [childClick, setChildClick] = useState(null)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setAddress({
          formatted_address: "",
          coords: { lat: latitude, lng: longitude },
        })
      }
    )
    setZoomLv(10)
  }, [])

  return (
    <>
      <Navbar
        address={address}
        setAddress={setAddress}
        drawingMap={drawingMap}
        setDrawingMap={setDrawingMap}
      />
      <main className='h-[92vh] flex relative'>
        <div className='w-[40%]'>
          <Sidebar
            posts={null}
            // setPosts={setPosts}
            setAddress={setAddress}
            filters={filters}
            setFilters={setFilters}
            childClick={childClick}
            drawingMap={drawingMap}
          />
        </div>
        <div className='w-[60%]'>
          <Map
            posts={null}
            address={address}
            setAddress={setAddress}
            zoomLv={zoomLv}
            setZoomLv={setZoomLv}
            drawingMap={drawingMap}
            setChildClick={setChildClick}
          />
        </div>
      </main>
    </>
  )
}

export default Home
