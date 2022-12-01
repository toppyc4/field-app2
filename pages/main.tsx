import React, {useState} from 'react'
import Navbar from '../Components/app/Navbar'
import Sidebar from '../Components/app/Sidebar'
import Map from '../Components/app/Map'

const Home = () => {
    const [childClick, setChildClick] = useState(null)
  return (
    <>
        <Navbar />
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