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
  mapRef,
}: {
  posts: Post[] | null
  address: Address
  setAddress: (address: Address) => void
  drawingMap: boolean
  selectedMarker: Post | null
  setSelectedMarker: (marker: Post) => void
  mapRef: React.MutableRefObject<null>
}): JSX.Element => {
  const { data, error } = useSWR("/api/mapURL", fetcher)
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
    mapRef.current.map_?.setZoom(12)
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
            options={options}
            center={address.coords}
            defaultZoom={13}
          >
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
                    src={
                      iconType(post.typeOfService) ||
                      "/icon/location-black-marker.svg"
                    }
                    width={20}
                    height={20}
                    alt='marker'
                  />
                </div>
              )
            })}
          </GoogleMapReact>
        </div>
      )}
    </div>
  )
}

export default Map
