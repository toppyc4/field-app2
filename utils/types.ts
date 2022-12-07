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

  "Mae_Hong_Son",

  "Chiang_Mai",

  "Chiang_Rai",

  "Phayao",

  "Nan",

  "Phrae",

  "Uttaradit",

  "Lumpang",

  "Lumphun",

  "Tak",

  "Kamphaeng_Phet",

  "Sukhothai",

  "Phitsanulok",

  "Phichit",

  "Nakhon_Sawan",

  "Uthai_Thani",

  "Chai_Nat",

  "Phetchabun",

  "Loei",

  "Nong_Bua_Lumphu",

  "Udon_Thani",

  "Nong_Khai",

  "Bueng_Kan",

  "Nakhon_Phanom",

  "Sakhon_Nakhon",

  "Mukdahan",

  "Kalasin",

  "Maha_Sarakham",

  "Khon_Kaen",

  "ChaiyaPhum",

  "Ubon_Ratchathani",

  "Amnat_Charoen",

  "Yasothon",

  "Roi_Et",

  "Sisaket",

  "Surin",

  "Buri_Rum",

  "Nakhon_Ratchasima",

  "SaKaeo",

  "Trat",

  "Chanthaburi",

  "Rayong",

  "Chonburi",

  "Chachoengsao",

  "Samut_Prakan",

  "Nakhon_Nayok",

  "Pathum_Thani",

  "Saraburi",

  "Phra_Nakhon_Si_Ayutthaya",

  "Ang_Thong",

  "Sing_Buri",

  "Suphan_Buri",

  "Khamphaeng_Phet",

  "Kanchanaburi",

  "Nakhon_Pathom",

  "Samut_Sakhon",

  "Samut_SongKhram",

  "Ratchaburi",

  "Phetchaburi",

  "Prachuap_Khiri_Khan",

  "Chumphon",

  "Ranong",

  "Surat_Thani",

  "Phang_nga",

  "Phuket",

  "Krabi",

  "Nakhon_Si_Thammarat",

  "Trang",

  "Phatthalung",

  "Songkhla",

  "Satun",

  "Pattani",

  "Yala",

  "Narathiwat",
] as const

export const services = [
  "Vacant_Land",
  "Real_Estate",
  "Property",
  "Service",
] as const

export type ProvincesType = typeof provinces[number]
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
