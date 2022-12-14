import { NextPage } from "next"

import { useState, useEffect } from "react"

// import { PlacesContext } from "../lib/context"
import { Coord, Filters as FiltersType, Post } from "../../utils/types"
import Map from "../../Components/app/Map"
import Navbar from "../../Components/app/Navbar"
import Sidebar from "../../Components/app/Sidebar"

const Home: NextPage = () => {
  const [coordinate, setCoordinate] = useState<Coord>({
    lat: 13.7563,
    lng: 100.5018,
  })
  const [filters, setFilters] = useState<FiltersType>({
    province: null,
    typeOfService: {
      Vacant_Land: false,
      Real_Estate: false,
      Property: false,
      Condomidium: false,
      Service: false,
      Product: false,
    },
  })
  const [zoomLv, setZoomLv] = useState(11)

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
            posts={null}
            // setPosts={setPosts}
            setCoordinate={setCoordinate}
            filters={filters}
            setFilters={setFilters}
            childClick={childClick}
            drawingMap={drawingMap}
          />
        </div>
        <div className='w-[60%]'>
          <Map
            posts={null}
            coordinate={coordinate}
            setCoordinate={setCoordinate}
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
