import { ParsedUrlQuery } from "querystring"

export type Props = {
  post: Post
  province: ProvincesType
}

export interface Params extends ParsedUrlQuery {
  province: string
}

export type Coord = {
  lat: number
  lng: number
}

export type Address = {
  formatted_address: string
  coords?: Coord | undefined
  place_id?: string | undefined
}

export const provinces = [
  "Bangkok",

  "Mae-Hong-Son",

  "Chiang-Mai",

  "Chiang-Rai",

  "Phayao",

  "Nan",

  "Phrae",

  "Uttaradit",

  "Lumpang",

  "Lumphun",

  "Tak",

  "Kamphaeng-Phet",

  "Sukhothai",

  "Phitsanulok",

  "Phichit",

  "Nakhon-Sawan",

  "Uthai-Thani",

  "Chai-Nat",

  "Phetchabun",

  "Loei",

  "Nong-Bua-Lumphu",

  "Udon-Thani",

  "Nong-Khai",

  "Bueng-Kan",

  "Nakhon-Phanom",

  "Sakhon-Nakhon",

  "Mukdahan",

  "Kalasin",

  "Maha-Sarakham",

  "Khon-Kaen",

  "ChaiyaPhum",

  "Ubon-Ratchathani",

  "Amnat-Charoen",

  "Yasothon",

  "Roi-Et",

  "Sisaket",

  "Surin",

  "Buri-Rum",

  "Nakhon-Ratchasima",

  "SaKaeo",

  "Trat",

  "Chanthaburi",

  "Rayong",

  "Chonburi",

  "Chachoengsao",

  "Samut-Prakan",

  "Nakhon-Nayok",

  "Pathum-Thani",

  "Saraburi",

  "Phra-Nakhon-Si-Ayutthaya",

  "Ang-Thong",

  "Sing-Buri",

  "Suphan-Buri",

  "Khamphaeng-Phet",

  "Kanchanaburi",

  "Nakhon-Pathom",

  "Samut-Sakhon",

  "Samut-SongKhram",

  "Ratchaburi",

  "Phetchaburi",

  "Prachuap-Khiri-Khan",

  "Chumphon",

  "Ranong",

  "Surat-Thani",

  "Phang-nga",

  "Phuket",

  "Krabi",

  "Nakhon-Si-Thammarat",

  "Trang",

  "Phatthalung",

  "Songkhla",

  "Satun",

  "Pattani",

  "Yala",

  "Narathiwat",
] as const

export const services = [
  "vacant_land",
  "real_estate",
  "property",
  "condomidium",
  "product",
  "service",
] as const

export type ProvincesType =
  | "Bangkok"
  | "Mae Hong Son"
  | "Chiang Mai"
  | "Chiang Rai"
  | "Phayao"
  | "Nan"
  | "Phrae"
  | "Uttaradit"
  | "Lumpang"
  | "Lumphun"
  | "Tak"
  | "Kamphaeng Phet"
  | "Sukhothai"
  | "Phitsanulok"
  | "Phichit"
  | "Nakhon Sawan"
  | "Uthai Thani"
  | "Chai Nat"
  | "Phetchabun"
  | "Loei"
  | "Nong Bua Lumphu"
  | "Udon Thani"
  | "Nong Khai"
  | "Bueng Kan"
  | "Nakhon Phanom"
  | "Sakhon Nakhon"
  | "Mukdahan"
  | "Kalasin"
  | "Maha Sarakham"
  | "Khon Kaen"
  | "ChaiyaPhum"
  | "Ubon Ratchathani"
  | "Amnat Charen"
  | "Yasothon"
  | "Roi-Et"
  | "Sisaket"
  | "Surin"
  | "Buri Ru"
  | "Nakhon Ratchasima"
  | "SaKaeo"
  | "Trat"
  | "Chanthabur"
  | "Rayong"
  | "Chonburi"
  | "Chachoengsao"
  | "Samut Prakan"
  | "Nakhon Nayok"
  | "Pathum Thani"
  | "Saraburi"
  | "Phra Nakhon Si Ayutthaya"
  | "Ang Thong"
  | "Sing Buri"
  | "Suphan Buri"
  | "Khamphaeng Phet"
  | "Kanchanaburi"
  | "Nakhon Pathom"
  | "Samut Sakhon"
  | "Samut SongKhram"
  | "Ratchaburi"
  | "Phetchaburi"
  | "Prachuap Khiri Khan"
  | "Chumphon"
  | "Ranong"
  | "Surat Thani"
  | "Phang-nga"
  | "Phuket"
  | "Krabi"
  | "Nakhon Si Thammarat"
  | "Trang"
  | "Phatthalung"
  | "Songkhla"
  | "Satun"
  | "Pattani"
  | "Yala"
  | "Narathiwat"
  | null
export type ServicesType = typeof services[number]

export type Filters = {
  province: ProvincesType

  typeOfService: {
    [key in ServicesType]: boolean
  }
}

export type Post = {
  address: {
    coordinate: Coord
    streetAddress1: string
    streetAddress2?: string
    locality: string
    district: string
    province: string
    zipCode: string
    country: string
  }
  content: string
  createdAt: any
  phone: string
  photoUrl: string | null
  price: string
  published: boolean
  slug: string
  title: string
  typeOfService: ServicesType
  uid: string
  updateAt: any
  username: string
}

export const typesMap: {
  [key: string]: { icon: string; light: string; dark: string; type: string }
} = {
  vacant_land: {
    icon: "/icon/solid/solid-field-stack.svg",
    light: "#0f172a",
    dark: "#f8fafc",
    type: "Vacant Land",
  },
  real_estate: {
    icon: "/icon/solid/solid-home.svg",
    light: "#0f172a",
    dark: "#f8fafc",
    type: "Real_Estate",
  },
  property: {
    icon: "/icon/solid/solid-property.svg",
    light: "#0f172a",
    dark: "#f8fafc",
    type: "Property",
  },
  condomidium: {
    icon: "/icon/solid/solid-condo.svg",
    light: "#0f172a",
    dark: "#f8fafc",
    type: "Condomidium",
  },
  product: {
    icon: "/icon/solid/solid-truck.svg",
    light: "#0f172a",
    dark: "#f8fafc",
    type: "Product",
  },
  service: {
    icon: "/icon/solid/solid-service.svg",
    light: "#0f172a",
    dark: "#f8fafc",
    type: "Service",
  },
}
