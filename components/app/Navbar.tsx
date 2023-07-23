import Link from "next/link"
import Image from "next/image"
import { useContext, useState, useEffect } from "react"
import { UserContext } from "../../lib/context"
import { SignOutButton } from "../../pages/login"
import  {buttonStyles}  from "../ui/Button"

// import usePlacesAutocomplete from "use-places-autocomplete"

import SearchBox from "./SearchBox"
import { useRouter } from "next/router"
import { Address, Coord, Post } from "../../utils/types"
// import useHasMounted from "../../utils/useHasMounted"

// import { Autocomplete } from "@react-google-maps/api"

export default function Navbar({
  drawingMap,
  setDrawingMap,
  address,
  setAddress,
  mapRef,
}: {
  address: Address
  setAddress: (address: Address) => void
  drawingMap: boolean
  setDrawingMap: (drawingMap: boolean) => void
  mapRef: React.MutableRefObject<null>
}): JSX.Element {
  const { user, username } = useContext(UserContext)
  // const hasMounted = useHasMounted()

  const getLatLng = async (
    placeId: string,
    setValue: (lat: number, lng: number, addr: string) => void
  ) => {
    const response = await fetch("/api/geocode/" + placeId)
    const data = await response.json()
    const { lat, lng } = data.results[0].geometry.location
    const { formatted_address } = data.results[0]
    setValue(lat, lng, formatted_address)
    // setAddress
  }

  const [theme, setTheme] = useState(true)

  const handleTheme = () => {
    const newTheme = !theme
    localStorage.setItem('darkMode', newTheme.toString())
    setTheme(newTheme)
  }

  useEffect(() => {
    // Check if dark mode is alreadu set in local storage
    const storedDarkTheme = localStorage.getItem('darkMode')
    setTheme(storedDarkTheme === 'true')
  }, [])
  // const clearLocations = () => {
  //   setLocations([])
  // }

  // seem like this function is for set multiple coordinate on the map
  // useEffect(() => {
  //   if (address.place_id && !address.coords) {
  //     getLatLng(address.place_id, (lat, lng, addr) => {
  //       const newAddresses = address

  //       newAddresses.coords = { lat, lng }
  //       newAddresses.formatted_address = addr
  //       setAddress(newAddresses)
  //     })
  //   }
  // }, [])

  const CreatePostButton = () => {
    console.log(`username: ${username}`)
    const router = useRouter()
    return (
      <button
        onClick={() => {
          router.push("/admin")
        }}
        className='bg-blue-500 hover:bg-blue-400 border-solid border-b-4 border-blue-700 hover:border-blue-500 text-white rounded font-semibold px-1 py-0.5 lg:px-2 lg:py-1  xl:font-bold  xl:px-4  xl:py-2'
      >
        Create Post
      </button>
    )
  }
  const DrawMapButton = (): JSX.Element => {
    return (
      <button
        onClick={() => {
          setDrawingMap(!drawingMap)
        }}
        className='bg-blue-500 hover:bg-blue-400 border-solid border-b-4 border-blue-700 hover:border-blue-500 text-white rounded font-semibold px-1 py-0.5 lg:px-2 lg:py-1  xl:font-bold  xl:px-4  xl:py-2 '
      >
        {drawingMap ? "view Visualize Map" : "Draw Map"}
      </button>
    )
  }
  const ThemeButton = (): JSX.Element => {
    return (
      <button
        onClick={handleTheme}
        className='bg-blue-500 hover:bg-blue-400 text-white font-semibold xl:font-bold py-0.5 lg:py-1 xl:py-2 px-1 lg:px-2 xl:px-4 border-solid border-b-4 border-blue-700 hover:border-blue-500 rounded'
      >
        {theme ? <Image src ="/icon/sun.svg" alt="sun-icon" width={25} height={25}/> : <Image src ="/icon/moon.svg" alt="moon-icon" width={25} height={25} /> }
      </button>
    )
  }

  return (
    <nav className='w-screen h-[8vh] bg-slate-800 px-[4vw] flex justify-btween items-center drops-shadow-lg'>
      <Link href='/'>
        <h1 className='text-5xl xl:text-[66px] font-bold text-white justify-self-start cursor-pointer '>
          Field
        </h1>
      </Link>

      <div className='ml-auto mr-3 inline-block relative w-36 xl:w-64'>
        <SearchBox
          // the value is placeId of selected place
          value={{
            value: address.place_id,
            label:
              address.formatted_address == ""
                ? "Search Google Map"
                : address.formatted_address,
          }}
          setValue={(label, value) => {
            getLatLng(value, (lat, lng) => {
              const newAddress = address
              newAddress.coords = { lat, lng }
              newAddress.formatted_address = label
              newAddress.place_id = value
              setAddress(newAddress)
              // @ts-ignore
              mapRef.current.map_?.panTo(newAddress.coords)
              // @ts-ignore
              mapRef.current.map_?.setZoom(12)
            })
          }}
          placeholder='Search'
        />
        {/* <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
          <input
            className='appearance-none block w-full my-2 bg-white text-gray-700  border-gray-400  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
            id='search-box'
            type='text'
            placeholder='Search'
          />
        </Autocomplete> */}
      </div>
      <>
        <div className='flex content-center'>
          <Link
            href={`/${username}`}
            className='flex bg-lime-500 hover:bg-lime-400 text-white font-bold my-auto mr-3 p-1 max-h-[50px] border-solid border-b-4 border-lime-700 hover:border-lime-500 rounded overflow-hidden'
          >
            <Image
              src={user?.photoURL || "/img/question-mark-profile.jpg"}
              width={50}
              height={50}
              alt='profile pic'
              className='mr-2 w-[56px] h-[56px] self-center cursor-pointer rounded-full'
              referrerPolicy='no-referrer'
            />
            <p className='my-auto text-md self-center'>
              {username !== null ? username : "unknown"}
            </p>
          </Link>
          <div className='mr-3'>
            <CreatePostButton />
          </div>
          <div className='mr-3'>
            <DrawMapButton />
          </div>
          <div className='mr-3'>
            <SignOutButton />
          </div>
          <div className=''>
            <ThemeButton />
          </div>
        </div>
      </>
    </nav>
  )
}
