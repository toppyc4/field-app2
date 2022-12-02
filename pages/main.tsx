import React, {useState} from 'react'
import Navbar from '../Components/app/Navbar'
import Sidebar from '../Components/app/Sidebar'
import Map from '../Components/app/Map'
import { Post } from "../utils/types"


const Home = () => {
  const posts: Post[] = [{
    address: {
      coordinate: {
          lat: 13.719523901088266,
          lng: 100.551340623518,
      },
      country: 'Thailand',
      district: 'Thung Maha Mek',
      locality: 'Sathon',
      province: 'Bangkok',
      streetAddress1: '60 Chuea Phloeng 2 Alley ',
      streetAddress2: '',
      zipCode: '10120',
  },
  content: 'refreshing garden in Sathon',
  createdAt: 'November 14, 2022 at 1:12:44 PM UTC+7',
  phone: '909-106-3333',
  photoUrl: null,
  price: '1,000,000 bath',
  published: true,
  slug: 'baan-suan-sathon',
  title: 'Baan-Suan-Sathon',
  typeOfService: 'Vacant Land',
  uid: '49n825lVYESbjg7mtAqBO3XStwZ2',
  updateAt: 'November 14, 2022 at 1:12:44 PM UTC+7',
  username: 'joffrey',
  }, {
    address: {
      coordinate: {
          lat: 13.719523901088266,
          lng: 100.551340623518,
      },
      country: 'Thailand',
      district: 'Thung Maha Mek',
      locality: 'Sathon',
      province: 'Bangkok',
      streetAddress1: '60 Chuea Phloeng 2 Alley ',
      streetAddress2: '',
      zipCode: '10120',
  },
  content: 'refreshing garden in Sathon',
  createdAt: 'November 14, 2022 at 1:12:44 PM UTC+7',
  phone: '909-106-3333',
  photoUrl: null,
  price: '1,000,000 bath',
  published: true,
  slug: 'baan-suan-sathon',
  title: 'Baan-Suan-Sathon',
  typeOfService: 'Vacant Land',
  uid: '49n825lVYESbjg7mtAqBO3XStwZ2',
  updateAt: 'November 14, 2022 at 1:12:44 PM UTC+7',
  username: 'joffrey',
  }, {
    address: {
      coordinate: {
          lat: 13.719523901088266,
          lng: 100.551340623518,
      },
      country: 'Thailand',
      district: 'Thung Maha Mek',
      locality: 'Sathon',
      province: 'Bangkok',
      streetAddress1: '60 Chuea Phloeng 2 Alley ',
      streetAddress2: '',
      zipCode: '10120',
  },
  content: 'refreshing garden in Sathon',
  createdAt: 'November 14, 2022 at 1:12:44 PM UTC+7',
  phone: '909-106-3333',
  photoUrl: null,
  price: '1,000,000 bath',
  published: true,
  slug: 'baan-suan-sathon',
  title: 'Baan-Suan-Sathon',
  typeOfService: 'Vacant Land',
  uid: '49n825lVYESbjg7mtAqBO3XStwZ2',
  updateAt: 'November 14, 2022 at 1:12:44 PM UTC+7',
  username: 'joffrey',
  }]
  const [coordinates, setCoordinates] = useState({
    lat: 13.7563,
    lng: 100.5018,
  })
    const [childClick, setChildClick] = useState(null)
    const [zoomLv, setZoomLv] = useState(11)
    const [drawingMap, setDrawingMap] = useState(false)
  return (
    <>
        <Navbar setCoordinates={setCoordinates} drawingMap={drawingMap} setDrawingMap={setDrawingMap}/>
        <main className='h-[90vh] flex'>
            <div className='w-[40%]'>
                <Sidebar 
                  // @ts-ignore
                  childClick={childClick}
                  posts={posts}
                />
            </div>
            <div className='w-[60%]'>
                <Map
                  
                  posts={posts}
                  coordinates={coordinates}
                  setCoordinates={setCoordinates}
                  // @ts-ignore
                  zoomLv={zoomLv}
                  setZoomLv={setZoomLv}
                  // setBounds,
                  drawingMap={drawingMap}
                  setChildClick={setChildClick}
                />
            </div>
        </main>
    </>
  )
}

export default Home