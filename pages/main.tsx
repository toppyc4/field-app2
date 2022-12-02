import React, {useState} from 'react'
import Navbar from '../Components/app/Navbar'
import Sidebar from '../Components/app/Sidebar'
import Map from '../Components/app/Map'

const Home = () => {
  const [coordinates, setCoordinates] = useState({
    lat: 13.7563,
    lng: 100.5018,
  })
    const [childClick, setChildClick] = useState(null)
    const [drawingMap, setDrawingMap] = useState(false)
  return (
    <>
        <Navbar setCoordinates={setCoordinates} drawingMap={drawingMap} setDrawingMap={setDrawingMap}/>
        <main className='h-[90vh] flex'>
            <div className='w-[40%]'>
                <Sidebar 
                  // @ts-ignore
                  childClick={childClick}
                />
            </div>
            <div className='w-[60%]'>
                <Map />
            </div>
        </main>
    </>
  )
}

export default Home