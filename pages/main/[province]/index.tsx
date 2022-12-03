import React, {useState} from 'react'
import { GetServerSideProps } from 'next'

import Navbar from '../../../Components/app/Navbar'
import Sidebar from '../../../Components/app/Sidebar'
import Map from '../../../Components/app/Map'
import { Post } from "../../../utils/types"

import {
  getPostsWithProvince,
  postToJSON,
} from "../../../lib/firebaseConfig"
import { query,
  collection,
  where,
  getDocs,
  limit,
  orderBy,
  getFirestore, } from 'firebase/firestore'

export default function HomeByProvince ({ posts, province } : {posts: Post[] | null; province: any}): JSX.Element {
//   const posts: Post[] = [{
//     address: {
//       coordinate: {
//           lat: 13.719523901088266,
//           lng: 100.551340623518,
//       },
//       country: 'Thailand',
//       district: 'Thung Maha Mek',
//       locality: 'Sathon',
//       province: 'Bangkok',
//       streetAddress1: '60 Chuea Phloeng 2 Alley ',
//       streetAddress2: '',
//       zipCode: '10120',
//   },
//   content: 'refreshing garden in Sathon',
//   createdAt: 'November 14, 2022 at 1:12:44 PM UTC+7',
//   phone: '909-106-3333',
//   photoUrl: null,
//   price: '1,000,000 bath',
//   published: true,
//   slug: 'baan-suan-sathon',
//   title: 'Baan-Suan-Sathon',
//   typeOfService: 'Vacant Land',
//   uid: '49n825lVYESbjg7mtAqBO3XStwZ2',
//   updateAt: 'November 14, 2022 at 1:12:44 PM UTC+7',
//   username: 'joffrey',
//   }, {
//     address: {
//       coordinate: {
//           lat: 13.719523901088266,
//           lng: 100.551340623518,
//       },
//       country: 'Thailand',
//       district: 'Thung Maha Mek',
//       locality: 'Sathon',
//       province: 'Bangkok',
//       streetAddress1: '60 Chuea Phloeng 2 Alley ',
//       streetAddress2: '',
//       zipCode: '10120',
//   },
//   content: 'refreshing garden in Sathon',
//   createdAt: 'November 14, 2022 at 1:12:44 PM UTC+7',
//   phone: '909-106-3333',
//   photoUrl: null,
//   price: '1,000,000 bath',
//   published: true,
//   slug: 'baan-suan-sathon',
//   title: 'Baan-Suan-Sathon',
//   typeOfService: 'Vacant Land',
//   uid: '49n825lVYESbjg7mtAqBO3XStwZ2',
//   updateAt: 'November 14, 2022 at 1:12:44 PM UTC+7',
//   username: 'joffrey',
//   }, {
//     address: {
//       coordinate: {
//           lat: 13.719523901088266,
//           lng: 100.551340623518,
//       },
//       country: 'Thailand',
//       district: 'Thung Maha Mek',
//       locality: 'Sathon',
//       province: 'Bangkok',
//       streetAddress1: '60 Chuea Phloeng 2 Alley ',
//       streetAddress2: '',
//       zipCode: '10120',
//   },
//   content: 'refreshing garden in Sathon',
//   createdAt: 'November 14, 2022 at 1:12:44 PM UTC+7',
//   phone: '909-106-3333',
//   photoUrl: null,
//   price: '1,000,000 bath',
//   published: true,
//   slug: 'baan-suan-sathon',
//   title: 'Baan-Suan-Sathon',
//   typeOfService: 'Vacant Land',
//   uid: '49n825lVYESbjg7mtAqBO3XStwZ2',
//   updateAt: 'November 14, 2022 at 1:12:44 PM UTC+7',
//   username: 'joffrey',
//   }]
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
                  posts={posts}
                  province={province}
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
                  // setBounds,
                  drawingMap={drawingMap}
                  setChildClick={setChildClick}
                />
            </div>
        </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const { params } = context
  let { province } = params
  const provinceDocs = await getPostsWithProvince(province)

  // console.log("paramsSSP", params)
  // console.log("provinceSSP", province)
  // If no user, short circuit to 404 page
  if (!provinceDocs) {
    return { notFound: true }
  }

  // JSON serializable data
  // let user = null
  let posts = null

  if (provinceDocs) {
    province = provinceDocs.data()

    const postQuery = query(
      collection(getFirestore(), provinceDocs.ref.path, "posts"),
      where("published", "==", true),
      orderBy("createdAt", "desc"),
      limit(30)
    )
    posts = (await getDocs(postQuery)).docs.map(postToJSON)
  }
  return {
    props: { posts, province }, // will be passed to the page component as props
  }
}


