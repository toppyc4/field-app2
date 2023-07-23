import { useState, createContext } from "react"

export const UserContext = createContext<{
  user: any
  username: string | null
  line: string | null
  facebook: string | null
  // admin: boolean
}>({ 
  user: null,
   username: null,
   line: null,
   facebook: null,
  //  admin: false 
  })

// export const CoordinateContext = createContext({
//   coordinates: {},
//   setCoordinates: () => {},
// })
