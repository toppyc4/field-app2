import { useContext, useRef, useMemo, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { ServicesType, Post as PostType } from "../../utils/types"

import { getUserWithUsername, postToJSON } from "../../lib/firebaseConfig"
import { UserContext } from "../../lib/context"

import {
  collectionGroup,
  doc,
  getDocs,
  getDoc,
  getFirestore,
  limit,
  query,
} from "firebase/firestore"

import GoogleMapReact from "google-map-react"
// import { useLoadScript, GoogleMap, MarkerF } from "@react-google-maps/api"
import { useDocumentData } from "react-firebase-hooks/firestore"

export async function getStaticProps({ params }: { params?: any }) {
  const { username, slug } = params
  const userDoc = await getUserWithUsername(username)

  let post
  let path

  if (userDoc) {
    console.log("userDoc.ref", userDoc.ref)
    const postRef = doc(getFirestore(), userDoc.ref.path, "posts", slug)

    post = postToJSON(await getDoc(postRef))

    path = postRef.path
  }

  return {
    props: { post, path },
    revalidate: 420,
  }
}

export async function getStaticPaths() {
  // Improve by using Admin SDK to select empty docs
  const q = query(collectionGroup(getFirestore(), "posts"), limit(1))
  const snapshot = await getDocs(q)

  const paths = snapshot.docs.map((doc) => {
    const { slug, username } = doc.data()
    return {
      params: { username, slug },
    }
  })

  return {
    // must be in this format:
    // paths: [
    //   { params: { username, slug }}
    // ],
    paths,
    fallback: "blocking",
  }
}

export default function Post(props: any): JSX.Element {
  const postRef = doc(getFirestore(), props.path)
  const [realtimePost] = useDocumentData(postRef)

  const post = realtimePost || props.post

  const { user: currentUser } = useContext(UserContext)

  // const { isLoaded } = useLoadScript({
  //   //@ts-ignore
  //   googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  //   libraries: ["places", "drawing", "geometry"],
  // })
  const mapRef = useRef()

  const options = useMemo(
    () => ({
      mapId: "1dc8eb85a559cb2e",
      // disableDefaultUI: true,
      // clickableIcons: false,
    }),
    []
  )

  function iconType(type: ServicesType) {
    if (type === "vacant_land") {
      return "/icon/solid/solid-field-stack.svg"
    } else if (type === "real_estate") {
      return "/icon/solid/solid-home.svg"
    } else if (type === "property") {
      return "/icon/solid/solid-property.svg"
    } else if (type === "condomidium") {
      return "/icon/solid/solid-condo.svg"
    } else if (type === "product") {
      return "/icon/solid/solid-truck.svg"
    } else if (type === "service") {
      return "/icon/solid/solid-service.svg"
    }
  }
  // const onLoad = useCallback(
  //   // setMap,
  //   (map) => (mapRef.current = map),
  //   []
  // )

  // if (!isLoaded) return <div>Loading . . . </div>

  console.log("[username slug] post", props.post)
  console.log("[username slug] path", props.path)
  console.log("[username slug] post coordinate:", props.post.address.coordinate)
  // const createdAt =
  //   typeof post?.createdAt === "number"
  //     ? new Date(post.createdAt)
  //     : post.createdAt.toDate()

  return (
    <div>
      <nav className='sticky top-0 max-w-screen h-[8vh] bg-slate-800 px-[4vw] flex justify-btween items-center drops-shadow-lg'>
        <Link href='/main'>
          <h1 className='text-[66px] font-bold text-white justify-self-start cursor-pointer '>
            Field
          </h1>
        </Link>
      </nav>
      <main className='text-lg'>
        <div className='flex justify-center mt-10'>
          <div className='flex flex-col w-[45vw]'>
            <div>
              <h1 className='text-4xl font-bold'>{post.title}</h1>
            </div>
            <Image
              src={post.photoUrl ? `${post.photoUrl}` : "/pic/field.png"}
              alt='post pic'
              className=' mt-4 border-black border-2'
              width={900}
              height={500}
            />
          </div>
          <aside className='flex flex-col mt-10 w-[25vw] p-4'>
            <div className='flex'>
              <b className='text-lg'>👤 Creator: </b>

              <div className='bg-lime-500 ml-auto mr-2 hover:bg-lime-400 text-white font-bold py-1 px-2 border-solid border-b-4 border-lime-700 hover:border-lime-500 rounded cursor-pointer'>
                <Link href={`/${post.username}`}>
                  <p>@{post.username}</p>
                </Link>
              </div>
              {currentUser?.uid === post.uid && (
                <Link
                  href={`/admin/${post.slug}`}
                  className='mr-2 bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-1 px-2 border-solid border-b-4 border-emerald-700 hover:border-lime-500 rounded cursor-pointer'
                >
                  <div className=''>Edit Post</div>
                </Link>
              )}
            </div>
            <div className='flex mt-7'>
              <b className='text-lg'>☎ Phone: </b>
              <span className='max-h-[48px] inline-block bg-gray-200 rounded-full ml-auto px-3 py-2 text-md font-semibold text-slate-900 mb-1'>
                {post.phone}
              </span>
            </div>
            <div className='flex mt-7'>
              <b className='text-lg'>💸 Price: </b>
              <span className='max-h-[48px] inline-block bg-lime-50 rounded-full ml-auto px-3 py-1 text-md font-semibold text-slate-900 mb-1'>
                {post.price}
              </span>
            </div>
          </aside>
        </div>

        {/* section 2 */}
        <div className='mx-[15vw] mt-4 mb-10 flex flex-col content-center'>
          <div className='mt-5'>
            <b className='text-2xl'>Content:</b>
            <p className='bg-white ml-1 p-4 text-xl'>{post.content}</p>
          </div>

          {/* address form */}
          <div className='flex mt-5'>
            <Image
              src='/icon/location-blue-marker.svg'
              alt='location blue icon'
              className=' pb-1 w-[40px] h-[40px]'
              width={40}
              height={40}
            />
            <b className='text-2xl'>Address: </b>
          </div>
          <div className='ml-1 p-2 px-5 text-lg'>
            <div className='grid grid-cols-3 gap-2'>
              <div className='col-span-3'>
                <b>Street Address: </b>
                <p className='bg-gray-200 p-2 rounded-md'>{`${
                  post.address.streetAddress1 ? post.address.streetAddress1 : ""
                } ${
                  post.address.streetAddress2 ? post.address.streetAddress2 : ""
                }`}</p>
              </div>
              <div>
                <b>Locality: </b>
                <p className='bg-gray-200 p-2 rounded-md'>{`${
                  post.address.locality
                    ? post.address.locality
                    : "-no locality [should not happend]-"
                }`}</p>
              </div>
              <div>
                <b>District: </b>
                <p className='bg-gray-200 p-2 rounded-md'>{`${
                  post.address.district
                    ? post.address.district
                    : "-no district [should not happend]-"
                }`}</p>
              </div>
              <div>
                <b>Province: </b>
                <p className='bg-gray-200 p-2 rounded-md'>{`${
                  post.address.province
                    ? post.address.province
                    : "-no province [should not happend]-"
                }`}</p>
              </div>
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <b>Country: </b>
                <p className='bg-gray-200 p-2 rounded-md'>{`${
                  post.address.country
                    ? post.address.country
                    : "-no province [should not happend]-"
                }`}</p>
              </div>
              <div>
                <b>Zip Code: </b>
                <p className='bg-gray-200 p-2 rounded-md'>{`${
                  post.address.zipCode
                    ? post.address.zipCode
                    : "-no zipCode [should not happend]-"
                }`}</p>
              </div>
            </div>
          </div>

          <div className='flex flex-col mt-5 mb-5'>
            <b className='text-2xl'>🗺Map:</b>
            <div className='h-96'>
              <GoogleMapReact
                bootstrapURLKeys={{
                  //@ts-ignore
                  key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
                }}
                defaultCenter={{
                  lat: post.address.coordinate?.lat || 13.7563,
                  lng: post.address.coordinate?.lng || 100.5018,
                }}
                options={options}
                center={{
                  lat: post.address.coordinate?.lat,
                  lng: post.address.coordinate?.lng,
                }}
                defaultZoom={13}
              >
                <div
                  // className='cursor-pointer'
                  //@ts-ignore
                  lat={post.address.coordinate.lat}
                  lng={post.address.coordinate.lng}
                >
                  <Image
                    //@ts-ignore
                    src={
                      iconType(post.typeOfService) ||
                      "/icon/location-black-marker.svg"
                    }
                    width={20}
                    height={20}
                    alt='marker'
                  />
                </div>
              </GoogleMapReact>
            </div>
            {/* <GoogleMap
              zoom={12}
              center={post.address.coordinate}
              mapContainerClassName='mt-4 mx-auto w-[120vh] h-[69vh]'
              options={options}
              onLoad={onLoad}
              // onCenterChanged={(e) => {
              //   console.log("e", e)
              //   setMiniMapCoor({ lat: e.center.lat, lng: e.center.lng })
              // }}
            >
              <MarkerF
                position={post.address.coordinate}
                icon={"/img/map-pin-black.svg"}
                className='abosolute z-1'
              />
            </GoogleMap> */}
          </div>
        </div>
      </main>
    </div>
  )
}
