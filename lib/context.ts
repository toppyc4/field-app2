import { useState, createContext } from "react"

export const UserContext = createContext<{
  user: any
  username: string | null
}>({ user: null, username: null })
// export const CoordinateContext = createContext({
//   coordinates: {},
//   setCoordinates: () => {},
// })
