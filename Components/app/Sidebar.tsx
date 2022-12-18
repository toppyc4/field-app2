import React, { useEffect, useState, createRef } from "react"
import { useRouter } from "next/router"

import SidebarItem from "./SidebarItem"
import Filters from "./Filters"
import { Post, Coord, Filters as FiltersType, Address } from "../../utils/types"

import { useTheme } from "next-themes"
import { toast } from "react-hot-toast"

export default function Sidebar({
  posts,
  // setPosts,
  filters,
  setFilters,
  childClick,
  setAddress,
  drawingMap,
}: {
  posts: Post[] | null
  // setPosts: (posts: Post[]) => void
  filters: FiltersType
  setFilters: (filters: FiltersType) => void
  childClick: any
  setAddress: (address: Address) => void
  drawingMap: boolean

  // type: ServicesType | null
}) {
  const router = useRouter()
  // const { query } = useRouter()
  const [elRefs, setElRefs] = useState([])
  const { theme } = useTheme()

  // const {
  //   ready,
  //   value,
  //   setValue,
  //   // suggestions: { status, data },
  //   clearSuggestions,
  // } = usePlacesAutocomplete()

  // console.log("province", province)
  // console.log("type", type)

  // console.log("router", router.query)
  // console.log("router.asPath", router.asPath)
  // console.log("router.asPath lenght", router.asPath.length)

  // function provinceTitle() {
  //   if (router.asPath.length > 5) {
  //     return decodeURIComponent(router.asPath.slice(6))
  //   } else if (router.asPath.length == 5) {
  //     return "Main"
  //   }
  //   // if (router.query.length !== 0) {
  //   //   return router.query.province
  //   // } else if (router.query === 0) {
  //   //   return <p>Main</p>
  //   // }
  // }

  // const handleSelect = async (val) => {
  //   setValue(val, false)
  //   clearSuggestions()

  //   const results = await getGeocode({ address: val })
  //   const { lat, lng } = await getLatLng(results[0])
  //   setCoordinates({ lat, lng })
  //   router.push(`/main/${val}`)
  // }

  // const handleTypeSelect = async (e) => {
  //   // e.preventDefault()
  //   const _type = await e.target.value
  //   // setValue(province, false)
  //   // alert(province)

  //   router.push(`/main/${province.province}/${_type}`)
  // }

  // const handleProvinceSelect = async (e: any) => {
  //   e.preventDefault()
  //   const _province = await e.target.value
  //   // setValue(province, false)
  //   // alert(province)

  //   getProvinceCoord(_province)
  //   router.push(`/main/${_province}`)
  // }

  const getProvinceCoord = async (
    // this function is only allow to run with province in string type
    province: string | null
  ) => {
    const response = await fetch("/api/autocomplete2/" + province)
    const data = await response.json()
    const provinceCoord = data.candidates[0].geometry.location
    const provinceAddrs = data.candidates[0].formatted_address
    setAddress({ formatted_address: provinceAddrs, coords: provinceCoord })
  }

  const search = async () => {
    getProvinceCoord(filters.province)
    router.push({
      pathname: `/main/${filters.province}/`,
      query: {
        // ...router.query,
        services: Object.keys(filters.typeOfService)
          .filter(
            (key) =>
              filters.typeOfService[key as keyof typeof filters.typeOfService]
          )
          .join(","),
      },
    })
    console.log("search")
  }

  useEffect(() => {
    const refs = Array(posts?.length)
      //@ts-ignore going to ignore .fill() for now Let see how MeetMeInTheMiddle did it
      .fill()
      .map((_, i) => elRefs[i] || createRef())

    setElRefs(refs)
  }, [posts])

  console.log("[Sidebar] posts: ", posts)
  console.log("[Sidebar] filters:", filters)
  console.log("[Sidebar] filters.province:", filters.province)
  return (
    <div className='h-[92vh] pt-2 px-4 bg-slate-100'>
      {/* filter div */}
      <div className='border-b-2 border-slate-400'>
        <div className='flex'>
          <h1 className='text-3xl font-bold ml-2'>
            {filters.province ? filters.province : "Province"}
          </h1>
          <span className='my-auto ml-auto mr-2'>
            - - - {posts?.length || 0} result(s) founded{" "}
          </span>
        </div>

        {/* province-Selector, type-Selector */}
        <div className='grid-list-selector'>
          <div className='relative mx-auto'>
            <label className='font-medium'> province: </label>

            <select
              onChange={(e) => {
                e.preventDefault()
                setFilters({
                  //@ts-ignore
                  province: e.target.value,
                  typeOfService: { ...filters.typeOfService },
                })
              }}
              className='block appearance-none w-64 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight cursor-pointer focus:outline-none focus:shadow-outline'
              defaultValue={"none"}
            >
              <option value='none' disabled hidden>
                Province (จังหวัด)
              </option>
              <option value='Amnat Charoen'>Amnat Charoen (อำนาจเจริญ)</option>
              <option value='Ang Thong'>Ang Thong (อ่างทอง)</option>
              <option value='Bangkok'>Bangkok (กรุงเทพฯ)</option>
              <option value='Buri Rum'>Buri Rum (บุรีรัมย์)</option>
              <option value='Bueng Kan'>Bueng Kan (บึงกาฬ)</option>
              <option value='Chachoengsao'>Chachoengsao (ฉะเชิงเทรา)</option>
              <option value='Chaiyaphum'>Chaiyaphum (ชัยภูมิ)</option>
              <option value='Chanthaburi'>Chanthaburi (จันทบุรี)</option>
              <option value='Chiang Mai'>Chiang Mai (เชียงใหม่)</option>
              <option value='Chiang Rai'>Chiang Rai (เชียงราย)</option>
              <option value='Chonburi'>Chonburi (ชลบุรี)</option>
              <option value='Chumphon'>Chumphon (ชุมพร)</option>
              <option value='Kalasin'>Kalasin (กาฬสินธุ์)</option>
              <option value='Kamphaeng-Phet'>Kamphaeng Phet (กำแพงเพชร)</option>
              <option value='Kanchanaburi '>Kanchanaburi (กาญจนบุรี)</option>
              <option value='Khon-Kaen'>Khon Kaen (ขอนแก่น)</option>
              <option value='Krabi'>Krabi (กระบี่)</option>
              <option value='Loei'>Loei (เลย)</option>
              <option value='Lumpang'>Lumpang (ลำปาง)</option>
              <option value='Lumphun'>Lumphun (ลำพูน)</option>
              <option value='Mae Hong Son'>Mae Hong Son (แม่ฮ่องสอน)</option>
              <option value='Maha Sarakham'>Maha Sarakham (มหาสารคาม)</option>
              <option value='Nakhon Nayok'>Nakhon Nayok (นครนายก)</option>
              <option value='Nakhon Pathom'>Nakhon Pathom (นครปฐม)</option>
              <option value='Mukdahan'>Mukdahan (มุกดาหาร)</option>
              <option value='Nakhon Phanom'>Nakhon Phanom (นครพนม)</option>
              <option value='Nakhon Ratchasima'>
                Nakhon Ratchasima (นครนครราชสีมา)
              </option>
              <option value='Nakhon Sawan'>Nakhon Sawan (นครสวรรค์)</option>
              <option value='Nakhon Si Thammarat'>
                Nakhon Si Thammarat (นครศรีธรรมราช)
              </option>
              <option value='Nan'>Nan (น่าน)</option>
              <option value='Narathiwat'>Narathiwat (นราธิวาส)</option>
              <option value='Nong Bua Lumphu'>
                Nong Bua Lumphu (หนองบัวลำภู)
              </option>
              <option value='Nong Khai'>Nong Khai (หนองคาย)</option>
              <option value='Pathum Thani'>Pathum Thani (ปทุมธานี)</option>
              <option value='Pattani'>Pattani (ปัตตานี)</option>
              <option value='Phang-nga'>Phang-nga (พังงา)</option>
              <option value='Phatthalung'>Phatthalung (พัทลุง)</option>
              <option value='Phayao'>Phayao (พะเยา)</option>
              <option value='Phetchabun'>Phetchabun (เพชรบูรณ์)</option>
              <option value='Phetchaburi'>Phetchaburi (เพชรบุรี)</option>
              <option value='Phichit'>Phichit (พิจิตร)</option>
              <option value='Phitsanulok'>Phitsanulok (พิษณุโลก)</option>
              <option value='Phra Nakhon Si Ayutthaya'>
                Phra Nakhon Si Ayutthaya (อยุธยา)
              </option>
              <option value='Phrae'>Phrae (แพร่)</option>
              <option value='Phuket'>Phuket (ภูเก็ต)</option>
              <option value='Prachuap Khiri Khan'>
                Prachuap Khiri Khan (ประจวบคีรีขันธ์)
              </option>
              <option value='Ranong'>Ranong (ระนอง)</option>
              <option value='Ratchaburi'>Ratchaburi (ราชบุรี)</option>
              <option value='Rayong'>Rayong (ระยอง)</option>
              <option value='Roi Et'>Roi Et (ร้อยเอ็ด)</option>
              <option value='Sa Kaeo'>Sa Kaeo (สระแก้ว)</option>
              <option value='Sakhon Nakhon'>Sakhon Nakhon (สกลนคร)</option>
              <option value='Samut Prakan'>Samut Prakan (สมุทรปราการ)</option>
              <option value='Samut Sakhon'>Samut Sakhon (สมุทรสาคร)</option>
              <option value='Sara Buri'>Sara Buri (สระบุรี)</option>
              <option value='Satun'>Satun (สตูล)</option>
              <option value='Sing-Buri'>Sing Buri (สิงห์บุรี)</option>
              <option value='Sisaket'>Sisaket (ศรีสะเกษ)</option>
              <option value='Songkhla'>Songkhla (สงขลา)</option>
              <option value='Sukhothai'>Sukhothai (สุโขทัย)</option>
              <option value='Suphan Buri'>Suphan Buri (สุพรรณบุรี)</option>
              <option value='Surat Thani'>Surat Thani (สุราษฎร์ธานี)</option>
              <option value='Surin'>Surin (สุรินทร์)</option>
              <option value='Tak'>Tak (ตาก)</option>
              <option value='Trat'>Trat (ตราด)</option>
              <option value='Ubon Ratchath'>Ubon Ratchath (อุบลราชธานี)</option>
              <option value='Udon Thani'>Udon Thani (อุดรธานี)</option>
              <option value='Uthai Thani'>Uthai Thani (อุทัยธานี)</option>
              <option value='Uttaradit'>Uttaradit (อุตรดิตถ์)</option>
              <option value='Yala'>Yala (ยะลา)</option>
            </select>

            <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center pt-6 px-2 text-gray-700'>
              <svg
                className='fill-current h-4 w-4'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'
              >
                <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
              </svg>
            </div>
          </div>
          <div className='relative mx-auto'>
            <label className='font-medium'> type of service: </label>

            <Filters filters={filters} setFilters={setFilters} />
            <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center pt-6 px-2 text-gray-700'>
              <svg
                className='fill-current h-4 w-4'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'
              >
                <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
              </svg>
            </div>
          </div>
        </div>
        <button
          className='flex mx-auto my-[0.42rem] w-auto bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-2 px-4 border-solid border-b-4 border-emerald-700 hover:border-emerald-500 rounded'
          onClick={search}
        >
          Search
        </button>
      </div>

      <div className='grid-list-items'>
        {posts?.map((post, i) => (
          <div className='m-2' ref={elRefs[i]} key={i}>
            <SidebarItem
              key={i}
              post={post}
              selected={Number(childClick) === i}
              refProp={elRefs[i]}
            />
          </div>
        ))}
        {!posts && (
          <div className='col-span-2'>
            <h3 className='text-2xl'>--- Please Choose Province ---</h3>
          </div>
        )}
        {posts?.length == 0 && (
          <div className='flex justify-center p-4 col-span-2'>
            <h3 className='text-2xl'>--- Zero post in this province ---</h3>
          </div>
        )}
      </div>
    </div>
  )
}
