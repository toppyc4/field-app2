import "../styles/globals.css"
import type { AppProps } from "next/app"
import { UserContext } from "../lib/context"
import { useUserData } from "../lib/hooks"
// import Layout from "../components/base/Layout"

import { useLoadScript } from "@react-google-maps/api"
import { Toaster } from "react-hot-toast"

function MyApp({ Component, pageProps }: AppProps) {
  const userData = useUserData()
  const { isLoaded } = useLoadScript({
    //@ts-ignore
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  })
  if (!isLoaded) {
    return <p>Loading . . . . . </p>
  }
  return (
      <UserContext.Provider value={userData}>
        <Component {...pageProps} />
        <Toaster />
      </UserContext.Provider>
  )
}

export default MyApp
