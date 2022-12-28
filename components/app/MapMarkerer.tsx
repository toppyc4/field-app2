import { useRef, useEffect, useState, useMemo, useCallback } from "react"
import { getGeocode, getLatLng } from "use-places-autocomplete"
// import { useLoadScript } from "@react-google-maps/api"
import Image from "next/image"
import GoogleMapReact from "google-map-react"
import { Address } from "../../utils/types"

export default function MapMarkerer({
  address,
  miniMapCoor,
  setMiniMapCoor,
}: {
  address: Address
  miniMapCoor: { lat: number; lng: number }
  setMiniMapCoor: (miniMapCoor: { lat: number; lng: number }) => void
}): JSX.Element {
  function handleClick(): void {
    getGeocode({ address: address.formatted_address })
      .then((results) => {
        console.log("Geocode results: ", results[0])
        const { lat, lng } = getLatLng(results[0])
        console.log("📍 MiniMapCoor: ", { lat, lng })
        setMiniMapCoor({ lat, lng })
        // setShowMap(true)
      })
      .catch((error) => {
        console.log("[MapMarkerer, handleClick()]:Error: ", error)
      })
    console.log("[MapMarkerer]: serch location")
  }

  return (
    <div className='my-4'>
      <div>
        <div className='flex'>
          <h3 className=' text-lg font-bold underline'>
            Adjust locantion on the map
            <i className=''> (Required/จำเป็นต้องใส่)</i>
          </h3>
        </div>
        <div className='my-2 flex'>
          <p className='max-w-md'>
            <b>address: </b> {address.formatted_address}
          </p>
          <button
            onClick={handleClick}
            className='text-base font-medium bg-cyan-100 border-b-2 border-cyan-200 hover:bg-cyan-50 hover:border-cyan-100 rounded-full ml-auto p-2'
            type='button'
          >
            Search Location
          </button>
        </div>
      </div>

      <div className='flex flex-col w-full h-[40vw] max-h-[720px] mt-[1rem] mb-[3rem]'>
        <b className='flex text-sm bg-lime-200 px-4 py-2 m-4 mt-0 justify-center content-center max-w-xl'>
          lat: {miniMapCoor?.lat}, lng: {miniMapCoor?.lng}
        </b>
        <GoogleMapReact
          defaultCenter={miniMapCoor}
          center={miniMapCoor}
          defaultZoom={15}
          //   options={""}
          onChange={(e) => {
            console.log("e", e)
            setMiniMapCoor({ lat: e.center.lat, lng: e.center.lng })
          }}
        >
          {miniMapCoor && (
            <div
              //@ts-ignore
              lat={miniMapCoor.lat}
              lng={miniMapCoor.lng}
              className='absolute z-2'
            >
              <Image
                src='/icon/location-black-marker.svg'
                alt='MapMarkerer'
                width={25}
                height={25}
              />
            </div>
          )}
        </GoogleMapReact>
      </div>
    </div>
  )
}
