import { useMemo, useCallback, useRef, useEffect, useState } from "react"
import Image from "next/image"

import DrawingMap from "./DrawingMap"
// import { useLoadScript, GoogleMap, MarkerF } from "@react-google-maps/api"
import { Post, ServicesType, Address, Coord } from "../../utils/types"
import GoogleMapReact from "google-map-react"
import useSWR from "swr"
import useHasMounted from "../../utils/useHasMounted"

// @ts-ignore
const fetcher = (...args) => fetch(...args).then((res) => res.json())

const Map = ({
  posts,
  address,
  setAddress,
  drawingMap,
  selectedMarker,
  setSelectedMarker,
}: // itemsRef,
{
  posts: Post[] | null
  address: Address
  setAddress: (address: Address) => void
  drawingMap: boolean
  selectedMarker: Post | null
  setSelectedMarker: (marker: Post) => void
  // itemsRef: React.MutableRefObject<HTMLDivElement | null>
}): JSX.Element => {
  const { data, error } = useSWR("/api/mapURL", fetcher)
  const mapRef = useRef(null)
  const hasMounted = useHasMounted()
  const options = useMemo(
    () => ({
      mapId: "1dc8eb85a559cb2e",
      // disableDefaultUI: true,
      // clickableIcons: false,
    }),
    []
  )

  useEffect(() => {
    // @ts-ignore
    mapRef.current.map_?.setCenter({
      lat: address.coords?.lat,
      lng: address.coords?.lng,
    })
    // @ts-ignore
    mapRef.current.map_?.setZoom(13)
  }, [address, data, hasMounted])

  useEffect(() => {
    if (selectedMarker && mapRef.current) {
      // @ts-ignore
      mapRef.current.map_?.setZoom(14)
      // @ts-ignore
      mapRef.current.map_?.panTo(selectedMarker.address.coordinate)
    }
  }, [selectedMarker])

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

  // function handleClick(position: { lat: number; lng: number }, post: Post) {
  //   if (selectedMarker && mapRef.current) {
  //   mapRef.current.map_?.panTo(selectedMarker.address.coordinate)
  //   // mapRef.current?.panTo(position)
  //   }
  // }

  console.log("[Map]posts", posts)
  console.log("[Map]address", address)
  console.log("[Map]mapRef", mapRef)

  return (
    <div className='w-full h-full bg-white'>
      {drawingMap ? (
        <DrawingMap address={address} />
      ) : (
        <div className='w-[100%] h-[100%] bg-black'>
          <GoogleMapReact
            ref={mapRef}
            // options={}
            bootstrapURLKeys={{
              // @ts-ignore
              key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
            }}
            defaultCenter={{
              lat: address.coords?.lat || 13.7563,
              lng: address.coords?.lng || 100.5018,
            }}
            center={address.coords}
            defaultZoom={13}
          >
            <div
              className='absolute z-1 hover:z-2'
              //@ts-ignore
              lat={address.coords?.lat}
              lng={address.coords?.lng}
            >
              <Image
                src={"/icon/location-black-marker.svg"}
                width={20}
                height={20}
                alt='marker'
              />
            </div>

            {posts?.map((post, i) => {
              return (
                <div
                  className='cursor-pointer'
                  //@ts-ignore
                  lat={post.address.coordinate.lat}
                  lng={post.address.coordinate.lng}
                  key={i}
                  onClick={() => {
                    if (posts) {
                      // const div = itemsRef.current.querySelector(
                      //   `div#p${
                      //     post.address.coordinate.lat +
                      //     post.address.coordinate.lng
                      //   }`
                      // )
                      const div = window.document.getElementById(
                        `p${
                          post.address.coordinate.lat +
                          post.address.coordinate.lng
                        }`
                      )
                      div?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      })
                      setSelectedMarker(post)
                    }
                  }}
                >
                  <Image
                    // @ts-ignore
                    src={iconType(post.typeOfService)}
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
