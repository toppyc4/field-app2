import React from 'react'
import GoogleMapReact from 'google-map-react'
import Link from 'next/link'
import Image from 'next/image'

const test = () => {
  return (
    <div className='w-full h-full'>
    <h1>h1</h1>
    <div className='w-[100vh] h-[50vh] bg-black'>
      <GoogleMapReact
        bootstrapURLKeys={{key: 'AIzaSyCI_-E-iNpc2Lp2L9cjonh2p9MX-bcp85g'}}
        defaultCenter={{lat: 13.7563, lng: 100.5018}}
        zoom={13}
      >
        <div
          className='absolute z-1 hover:z-2'
          //@ts-ignore
          lat={13.7563}
          lng={100.5018}
        >
          <Image
            src={'/Markers/location-black-marker.svg'}
            width={20}
            height={20}
            alt='marker'
          />
        </div>
      </GoogleMapReact>
    </div>

    </div>
  )
}

export default test