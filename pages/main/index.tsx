import { NextPage } from "next"
import { useState, useEffect, useRef } from "react"

import { Coord, Filters as FiltersType, Post, Address } from "../../utils/types"
import Map from "../../components/app/Map"
import Navbar from "../../components/app/Navbar"
import Sidebar from "../../components/app/Sidebar"

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

  const [drawingMap, setDrawingMap] = useState(false)
  const [selectedMarker, setSelectedMarker] = useState<Post | null>(null)
  const itemsRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef(null)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setAddress({
          formatted_address: "",
          coords: { lat: latitude, lng: longitude },
        })
      }
    )
  }, [])

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
            posts={null}
            setAddress={setAddress}
            filters={filters}
            setFilters={setFilters}
            selectedMarker={selectedMarker}
            setSelectedMarker={setSelectedMarker}
            drawingMap={drawingMap}
            mapRef={mapRef}
            // itemsRef={itemsRef}
          />
        </div>
        <div className='w-[60%]'>
          <Map
            posts={null}
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

export default Home
