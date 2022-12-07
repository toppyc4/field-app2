import { useMemo, useCallback, useRef, useEffect, useState } from "react"
import Image from "next/image"

import DrawingMap from "./DrawingMap"
// import GoogleMapReact from "google-map-react"
import { useLoadScript, GoogleMap, MarkerF } from "@react-google-maps/api"
import { Post, ServicesType, Address } from "../../utils/types"
import GoogleMapReact from "google-map-react"

const Map = ({
  posts,
  address,
  setAddress,
  zoomLv,
  setZoomLv,
  // setBounds,
  drawingMap,
  setChildClick,
}: {
  posts: Post[] | null
  address: Address
  setAddress: (address: Address) => void
  zoomLv: number
  setZoomLv: (zoomLv: number) => void
  drawingMap: boolean
  setChildClick: (childClick: any) => void
}) => {
  const [map, setMap] = useState(null)

  const mapRef = useRef()
  // const center = useMemo(() => ({ lat: 43, lng: -80 }), [])
  const options = useMemo(
    () => ({
      mapId: "1dc8eb85a559cb2e",
      // disableDefaultUI: true,
      // clickableIcons: false,
    }),
    []
  )
  const onLoad = useCallback(
    setMap,
    // (map) => (mapRef.current = map),
    []
  )
  const { isLoaded } = useLoadScript({
    // @ts-ignore
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: ["places", "drawing", "geometry"],
  })

  if (!isLoaded) return <div>Loading . . . </div>

  // useEffect(() => {
  //   navigator.geolocation.getCurrentPosition(
  //     ({ coords: { latitude, longitude } }) => {
  //       setCoordinates({ lat: latitude, lng: longitude })
  //     }
  //   )
  //   setZoomLv(11)
  // }, [])
  function iconType(type: ServicesType) {
    if (type === "Vacant_Land") {
      return "/Markers/solid/field-stack-marker.svg"
    } else if (type === "Real_Estate") {
      return "/Markers/solid/home-marker.svg"
    } else if (type === "Property") {
      return "/Markers/solid/building-storefront-marker.svg"
    } else if (type === "Service") {
      return "/Markers/solid/truck-marker.svg"
    }
  }

  // function handleClick(position: { lat: number; lng: number }, i: number) {
  //   setAddress(position)
  //   setChildClick(i)
  //   // mapRef.current?.panTo(position)
  //   setZoomLv(14)
  // }

  console.log("address", address)
  console.log("map", map)
  console.log("posts", posts)
  const center = { lat: 13.7563, lng: 100.5018 }
  return (
    <div className='w-full h-full bg-white'>
      {drawingMap ? (
        <DrawingMap address={address} />
      ) : (
        <div className='w-[100%] h-[100%] bg-black'>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: "AIzaSyCI_-E-iNpc2Lp2L9cjonh2p9MX-bcp85g",
            }}
            defaultCenter={{ lat: 13.7563, lng: 100.5018 }}
            center={address.coords}
            zoom={13}
          >
            <div
              className='absolute z-1 hover:z-2'
              //@ts-ignore
              lat={13.7563}
              lng={100.5018}
            >
              <Image
                src={"/Markers/location-black-marker.svg"}
                width={20}
                height={20}
                alt='marker'
              />
            </div>

            {posts?.map((post, i) => {
              return (
                <div
                  className='hover: cursor-pointer'
                  //@ts-ignore
                  lat={post.address.coordinate.lat}
                  lng={post.address.coordinate.lng}
                  key={i}
                >
                  <Image
                    src={`${iconType(post.typeOfService)}`}
                    width={20}
                    height={20}
                    alt='marker'
                  />
                </div>
              )
            })}
          </GoogleMapReact>
        </div>
        // <GoogleMap
        //   zoom={zoomLv}
        //   //@ts-ignore
        //   onZoomChanged={(e: any) => {
        //     if (map === null) {
        //       return
        //     }
        //     //@ts-ignore
        //     if (map.zoom !== zoomLv) {
        //       setZoomLv(e)
        //       return
        //     }
        //   }}
        //   center={coordinates}
        //   mapContainerClassName='w-full h-[92vh]'
        //   options={options}
        //   onLoad={
        //     (m: any) => setMap(m)
        //   }
        // >

        //   {posts?.map((post, i) => {
        //     // const markerLetter = String.fromCharCode(
        //     //   "A".charCodeAt(0) + (i % 26)
        //     // )

        //     const [iconType, setIconType] = useState('')
        //     useEffect(() => {
        //       if (post.typeOfService === "Vacant Land") {
        //             setIconType("/Markers/solid/field-stack-marker.svg")
        //           } else if (post.typeOfService === "Real Estate") {
        //             setIconType("/Markers/solid/home-marker.svg")
        //           } else if (post.typeOfService === "Property") {
        //             setIconType("/Markers/solid/building-storefront-marker.svg")
        //           } else if (post.typeOfService === "Service") {
        //             setIconType("/Markers/solid/truck-marker.svg")
        //           }
        //     }, [])
        //     console.log('iconType: ', iconType)
        //       // const iconStyle = iconType(post.typeOfService)

        //     return (
        //       <MarkerF
        //         position={post.address.coordinate}
        //         icon={iconType
        //         //   post.typeOfService === 'Vacant Land' ? '/Markers/solid/field-stack-marker.svg'
        //         // : post.typeOfService === 'Real Estate' ? '/Markers/solid/home-marker.svg'
        //         // : post.typeOfService === 'Property' ? '/Markers/solid/building-storefront-marker.svg'
        //         // : post.typeOfService === 'Service' ? '/Markers/solid/truck-marker.svg' : undefined
        //       }
        //         key={post.address.coordinate.lat + post.address.coordinate.lng}
        //         // className='abosolute z-1 cursor-pointer'
        //         onClick={() => handleClick(post.address.coordinate, i)}
        //       />
        //     )
        //   })}
        // </GoogleMap>
      )}
    </div>
  )
}

export default Map
