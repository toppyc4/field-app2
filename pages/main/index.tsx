import { useLoadScript } from "@react-google-maps/api"

import { useState, useEffect } from "react"

// import { PlacesContext } from "../lib/context"
import Map from "../../Components/app/Map"
import Sidebar from "../../Components/app/Sidebar"
import Navbar from "../../Components/app/Navbar"

const Home = (): JSX.Element => {
    const posts = null
  const [coordinates, setCoordinates] = useState({
    lat: 13.7563,
    lng: 100.5018,
  })
  const [zoomLv, setZoomLv] = useState(11)
  // const [bounds, setBounds] = useState(null)
  const [drawingMap, setDrawingMap] = useState(false)
  const [childClick, setChildClick] = useState(null)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude })
      }
    )
    setZoomLv(11)
  }, [])

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
        setCoordinates={setCoordinates}
        drawingMap={drawingMap}
        setDrawingMap={setDrawingMap}
      />
      <main className='h-[90vh] flex'>
        <div className='w-[40%]'>
          <Sidebar
            posts={posts}
            province={null}
            type={null}
            childClick={childClick}
            setCoordinates={setCoordinates}
            drawingMap={drawingMap}
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

export default Home
