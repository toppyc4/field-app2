import { useMemo, useCallback, useRef, useEffect, useState } from "react"

import DrawingMap from "./DrawingMap"
// import GoogleMapReact from "google-map-react"
import { useLoadScript, GoogleMap, MarkerF } from "@react-google-maps/api"
import { Post, TypeOfService } from "../../utils/types";

const Map = ({
  posts,
  coordinates,
  setCoordinates,
  zoomLv,
  setZoomLv,
  // setBounds,
  drawingMap,
  setChildClick,
}: {posts: Post[] | null; coordinates: {lat: number, lng: number}; setCoordinates: (coordinates: {lat: number, lng: number}) => void; zoomLv: number; setZoomLv: (zoomLv: number) => void; drawingMap: boolean; setChildClick: (childClick: any) => void; }) => {
  const [map, setMap] = useState(null)
  // const [zoomLv, setZoomLv] = useState(11)

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
  // const onLoad = useCallback(
  //   setMap,
  //   // (map) => (mapRef.current = map),
  //   []
  // )
  const { isLoaded } = useLoadScript({
    //@ts-ignore
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

  function handleClick(position: {lat: number, lng: number}, i: number) {
    setCoordinates(position)
    setChildClick(i)
    // mapRef.current?.panTo(position)
    setZoomLv(14)
  }

  function iconType(type: TypeOfService) {
    if (type === "Vacant Land") {
      return "/img/typed-markers/square-3-stack-3d.svg"
    } else if (type === "Real Estate") {
      return "/img/typed-markers/home.svg"
    } else if (type === "Property") {
      return "/img/typed-markers/building-storefront.svg"
    } else if (type === "Service") {
      return "/img/typed-markers/truck.svg"
    }
  }

  console.log("coordinates", coordinates)
  console.log("map", map)
  console.log("posts", posts)
  const center = { lat: 13.7563, lng: 100.5018 }
  return (
    <div className='w-full h-full bg-white'>
      {drawingMap ? (
        <DrawingMap coordinates={coordinates} />
      ) : (
        <GoogleMap
          zoom={zoomLv}
          //@ts-ignore
          onZoomChanged={(e: any) => {
            if (map === null) {
              return
            }
            //@ts-ignore
            if (map.zoom !== zoomLv) {
              setZoomLv(e)
            }
          }}
          center={coordinates}
          mapContainerClassName='w-full h-[92vh]'
          options={options}
          onLoad={
            (m: any) => setMap(m)
          }
        >
         
          {posts?.map((post, i) => {
            const markerLetter = String.fromCharCode(
              "A".charCodeAt(0) + (i % 26)
            )
            
            return (
              <MarkerF
                position={post.address.coordinate}
                icon={
                  iconType(post.typeOfService)
                  
                }
                key={post.address.coordinate.lat + post.address.coordinate.lng}
                // className='abosolute z-1 cursor-pointer'
                onClick={() => handleClick(post.address.coordinate, i)}
                
              />
            )
          })}
        </GoogleMap>
      )}
    </div>
  )
}

export default Map
