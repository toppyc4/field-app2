import { useContext, useRef, useMemo, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { ServicesType, Post as PostType } from "../../utils/types"

import { getUserWithUsername, postToJSON } from "../../lib/firebaseConfig"
import { UserContext } from "../../lib/context"
import Navbar2 from "../../components/app/Navbar2"

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

  return (
    <div>
      <Navbar2 />
      <main className='text-base xl:text-lg '>
        <div className='flex justify-center mt-10'>
          <div className='flex flex-col w-[41vw] h-[50vh]'>
            <div>
              <h1 className='text-2xl xl:text-4xl font-bold'>{post.title}</h1>
            </div>
            <div className='relative h-full xl:h-[60vh] w-full xl:w-[40vw] mt-4 border-black border-2 bg-gray-100'>
              <Image
                src={post.photoUrl ? `${post.photoUrl}` : "/pic/field.png"}
                alt='post pic'
                className=''
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
          </div>
          <aside className='flex flex-col mt-16 xl:mt-14 2xl:mt-10 w-[30vw] xl:w-[25vw] p-4'>
            <div className='flex flex-wrap'>
              <b className='text-base xl:text-lg'>👤Creator: </b>
              <div className='bg-lime-500 ml-auto hover:bg-lime-400 text-white font-semibold xl:font-bold py-0.5 xl:py-1 px-1 xl:px-2 border-solid border-b-4 border-lime-700 hover:border-lime-500 rounded cursor-pointer'>
                <Link href={`/${post.username}`}>
                  <p>@{post.username}</p>
                </Link>
              </div>
              {currentUser?.uid === post.uid && (
                <Link
                  href={`/admin/${post.slug}`}
                  className='mr-2 bg-emerald-500 hover:bg-emerald-400 text-white lg:ml-auto 2xl:ml-2 font-semibold xl:font-bold py-0.5 xl:py-1 px-1 xl:px-2 border-solid border-b-4 border-emerald-700 hover:border-lime-500 rounded cursor-pointer'
                >
                  <div className=''>Edit Post</div>
                </Link>
              )}
            </div>

            <div className='flex flex-wrap mt-3 2xl:mt-7'>
              <b className='text-base xl:text-lg'>First Name: </b>
              <span className='h-[32px] xl:h-[48px] inline-block rounded-full ml-auto px-1 xl:px-3 py-0.5 xl:py-2 text-base xl:text-md font-semibold text-slate-900 mb-1'>
                first name
              </span>
            </div>
            <div className='flex flex-wrap mt-3 2xl:mt-7'>
              <b className='text-base xl:text-lg'>Last Name: </b>
              <span className='h-[32px] xl:h-[48px] inline-block rounded-full ml-auto px-1 xl:px-3 py-0.5 xl:py-2 text-base xl:text-md font-semibold text-slate-900 mb-1'>
                last name
              </span>
            </div>

            <div className='flex flex-wrap mt-3 2xl:mt-7'>
              <b className='text-base xl:text-lg'>💸Price: </b>
              <span className='h-[32px] xl:h-[48px] inline-block bg-lime-100 rounded-full ml-auto px-1 xl:px-3 py-0.5 xl:py-2 text-base xl:text-md font-semibold text-slate-900 mb-1'>
                {post.price}
              </span>
            </div>
            <div className='flex flex-wrap mt-3 2xl:mt-7'>
              <div className=' my-auto relative w-[25px] xl:w-[35px] h-[25px] xl:h-[35px]'>
                <Image
                  src={"/icon/icon8/facebook.svg"}
                  alt='facebook icon'
                  fill
                />
              </div>
              <b className='text-base xl:text-lg my-auto'>Facebook: </b>
              <span className='h-[32px] xl:h-[48px] inline-block bg-purple-500 rounded-full ml-auto px-1 xl:px-3 py-0.5 xl:py-2 text-base xl:text-md font-semibold text-slate-900 mb-1'>
                Facebook
              </span>
            </div>
            <div className='flex flex-wrap mt-3 2xl:mt-7'>
              <div className=' my-auto relative w-[25px] xl:w-[35px] h-[25px] xl:h-[35px]'>
                <Image src={"/icon/icon8/line.svg"} alt='line icon' fill />
              </div>
              <b className=' text-base xl:text-lg my-auto'>Line: </b>
              <span className='h-[32px] xl:h-[48px] inline-block bg-green-300 rounded-full ml-auto px-1 xl:px-3 py-0.5 xl:py-2 text-base xl:text-md font-semibold text-slate-900 mb-1'>
                line
              </span>
            </div>
            <div className='flex flex-wrap mt-3 2xl:mt-7'>
              <b className='text-base xl:text-lg '>☎Phone: </b>
              <span className='h-[32px] xl:h-[48px] inline-block bg-gray-200 rounded-full ml-auto px-1 xl:px-3 py-0.5 xl:py-2 text-base xl:text-md font-semibold text-slate-900 mb-1'>
                {post.phone}
              </span>
            </div>
          </aside>
        </div>

        {/* section 2 */}
        <div className='mx-[15vw] mt-4 mb-10 flex flex-col content-center'>
          <div className='mt-5'>
            <b className='text-xl xl:text-2xl'>Content:</b>
            <p className='bg-white ml-1 p-4 text-xl '>{post.content}</p>
          </div>

          {/* address form */}
          <div className='flex mt-5'>
            <Image
              src='/icon/location-blue-marker.svg'
              alt='location blue icon'
              className=' pb-1 w-[30px] xl:w-[40px] h-[30px] xl:h-[40px]'
              width={40}
              height={40}
            />
            <b className='text-xl xl:text-2xl'>Address: </b>
          </div>
          <div className='ml-1 p-2 px-5 text-base xl:text-lg '>
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
            <b className='text-xl xl:text-2xl'>🗺Map:</b>
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
          </div>
        </div>
      </main>
    </div>
  )
}
