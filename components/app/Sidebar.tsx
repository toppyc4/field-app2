import React, { useEffect, useState, createRef } from "react"
import { useRouter } from "next/router"

import SidebarItem from "./SidebarItem"
import Filters from "./Filters"
import { Post, Coord, Filters as FiltersType, Address } from "../../utils/types"

import { useTheme } from "next-themes"
import { toast } from "react-hot-toast"

export default function Sidebar({
  posts,
  filters,
  setFilters,
  selectedMarker,
  setSelectedMarker,
  setAddress,
  drawingMap,
}: {
  posts: Post[] | null
  filters: FiltersType
  setFilters: (filters: FiltersType) => void
  selectedMarker: Post | null
  setSelectedMarker: (marker: Post) => void
  setAddress: (address: Address) => void
  drawingMap: boolean
}): JSX.Element {
  const router = useRouter()

  const [elRefs, setElRefs] = useState([])
  const { theme } = useTheme()

  const getProvinceCoord = async (province: string) => {
    const response = await fetch("/api/autocomplete2/" + province)
    const data = await response.json()
    const provinceCoord = data.candidates[0].geometry.location
    const provinceAddrs = data.candidates[0].formatted_address
    setAddress({ formatted_address: provinceAddrs, coords: provinceCoord })
  }

  const search = async () => {
    getProvinceCoord(filters.province!)
    router.push({
      pathname: `/main/${filters.province}/`,
      query: {
        services: Object.keys(filters.typeOfService)
          .filter(
            (key) =>
              filters.typeOfService[key as keyof typeof filters.typeOfService]
          )
          .join(","),
      },
    })
  }

  return (
    <div className='h-[92vh] pt-2 px-4 bg-slate-100'>
      {/* filter div */}
      <div className='border-b-2 border-slate-400'>
        <div className='flex'>
          <h1 className='text-2xl xl:text-3xl font-bold ml-2'>
            {filters.province ? filters.province : "Province"}
          </h1>
          <span className='text-base my-auto ml-auto mr-2'>
            - - - {posts?.length || 0} result(s) founded{" "}
          </span>
        </div>

        {/* province-Selector, type-Selector */}
        <div className='grid grid-cols-2 gap-1'>
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
              className='block appearance-none w-24 lg:w-36 xl:w-52 2xl:w-64 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight cursor-pointer focus:outline-none focus:shadow-outline'
              defaultValue={"none"}
            >
              <option value='none' disabled hidden>
                Province (?????????????????????)
              </option>
              <option value='Amnat Charoen'>Amnat Charoen (??????????????????????????????)</option>
              <option value='Ang Thong'>Ang Thong (?????????????????????)</option>
              <option value='Bangkok'>Bangkok (????????????????????????)</option>
              <option value='Buri Rum'>Buri Rum (???????????????????????????)</option>
              <option value='Bueng Kan'>Bueng Kan (??????????????????)</option>
              <option value='Chachoengsao'>Chachoengsao (??????????????????????????????)</option>
              <option value='Chaiyaphum'>Chaiyaphum (?????????????????????)</option>
              <option value='Chanthaburi'>Chanthaburi (????????????????????????)</option>
              <option value='Chiang Mai'>Chiang Mai (???????????????????????????)</option>
              <option value='Chiang Rai'>Chiang Rai (????????????????????????)</option>
              <option value='Chonburi'>Chonburi (??????????????????)</option>
              <option value='Chumphon'>Chumphon (???????????????)</option>
              <option value='Kalasin'>Kalasin (???????????????????????????)</option>
              <option value='Kamphaeng-Phet'>Kamphaeng Phet (???????????????????????????)</option>
              <option value='Kanchanaburi '>Kanchanaburi (???????????????????????????)</option>
              <option value='Khon-Kaen'>Khon Kaen (?????????????????????)</option>
              <option value='Krabi'>Krabi (??????????????????)</option>
              <option value='Loei'>Loei (?????????)</option>
              <option value='Lumpang'>Lumpang (???????????????)</option>
              <option value='Lumphun'>Lumphun (???????????????)</option>
              <option value='Mae Hong Son'>Mae Hong Son (??????????????????????????????)</option>
              <option value='Maha Sarakham'>Maha Sarakham (???????????????????????????)</option>
              <option value='Nakhon Nayok'>Nakhon Nayok (?????????????????????)</option>
              <option value='Nakhon Pathom'>Nakhon Pathom (??????????????????)</option>
              <option value='Mukdahan'>Mukdahan (????????????????????????)</option>
              <option value='Nakhon Phanom'>Nakhon Phanom (??????????????????)</option>
              <option value='Nakhon Ratchasima'>
                Nakhon Ratchasima (???????????????????????????????????????)
              </option>
              <option value='Nakhon Sawan'>Nakhon Sawan (???????????????????????????)</option>
              <option value='Nakhon Si Thammarat'>
                Nakhon Si Thammarat (???????????????????????????????????????)
              </option>
              <option value='Nan'>Nan (????????????)</option>
              <option value='Narathiwat'>Narathiwat (????????????????????????)</option>
              <option value='Nong Bua Lumphu'>
                Nong Bua Lumphu (?????????????????????????????????)
              </option>
              <option value='Nong Khai'>Nong Khai (?????????????????????)</option>
              <option value='Pathum Thani'>Pathum Thani (????????????????????????)</option>
              <option value='Pattani'>Pattani (?????????????????????)</option>
              <option value='Phang-nga'>Phang-nga (???????????????)</option>
              <option value='Phatthalung'>Phatthalung (??????????????????)</option>
              <option value='Phayao'>Phayao (???????????????)</option>
              <option value='Phetchabun'>Phetchabun (???????????????????????????)</option>
              <option value='Phetchaburi'>Phetchaburi (????????????????????????)</option>
              <option value='Phichit'>Phichit (??????????????????)</option>
              <option value='Phitsanulok'>Phitsanulok (????????????????????????)</option>
              <option value='Phra Nakhon Si Ayutthaya'>
                Phra Nakhon Si Ayutthaya (??????????????????)
              </option>
              <option value='Phrae'>Phrae (????????????)</option>
              <option value='Phuket'>Phuket (??????????????????)</option>
              <option value='Prachuap Khiri Khan'>
                Prachuap Khiri Khan (?????????????????????????????????????????????)
              </option>
              <option value='Ranong'>Ranong (???????????????)</option>
              <option value='Ratchaburi'>Ratchaburi (?????????????????????)</option>
              <option value='Rayong'>Rayong (???????????????)</option>
              <option value='Roi Et'>Roi Et (????????????????????????)</option>
              <option value='Sa Kaeo'>Sa Kaeo (?????????????????????)</option>
              <option value='Sakhon Nakhon'>Sakhon Nakhon (??????????????????)</option>
              <option value='Samut Prakan'>Samut Prakan (?????????????????????????????????)</option>
              <option value='Samut Sakhon'>Samut Sakhon (???????????????????????????)</option>
              <option value='Sara Buri'>Sara Buri (?????????????????????)</option>
              <option value='Satun'>Satun (????????????)</option>
              <option value='Sing-Buri'>Sing Buri (???????????????????????????)</option>
              <option value='Sisaket'>Sisaket (????????????????????????)</option>
              <option value='Songkhla'>Songkhla (???????????????)</option>
              <option value='Sukhothai'>Sukhothai (?????????????????????)</option>
              <option value='Suphan Buri'>Suphan Buri (??????????????????????????????)</option>
              <option value='Surat Thani'>Surat Thani (????????????????????????????????????)</option>
              <option value='Surin'>Surin (????????????????????????)</option>
              <option value='Tak'>Tak (?????????)</option>
              <option value='Trat'>Trat (????????????)</option>
              <option value='Ubon Ratchath'>Ubon Ratchath (?????????????????????????????????)</option>
              <option value='Udon Thani'>Udon Thani (????????????????????????)</option>
              <option value='Uthai Thani'>Uthai Thani (???????????????????????????)</option>
              <option value='Uttaradit'>Uttaradit (???????????????????????????)</option>
              <option value='Yala'>Yala (????????????)</option>
            </select>

            <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center pt-2 lg:pt-4 xl:pt-6 px-0.5 lg:px-1 xl:px-2 text-gray-700'>
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
          <div className='m-2' key={i}>
            <SidebarItem
              key={i}
              post={post}
              setSelectedMarker={setSelectedMarker}
            />
          </div>
        ))}

        {!posts && (
          <div className='flex justify-center p-2 xl:p-4 xl:col-span-2'>
            <h3 className='text-lg xl:text-2xl'>
              --- Please Choose Province ---
            </h3>
          </div>
        )}
        {posts?.length == 0 && (
          <div className='flex justify-center p-2 xl:p-4 xl:col-span-2'>
            <h3 className='text-lg xl:text-2xl'>
              --- Zero post in this province ---
            </h3>
          </div>
        )}
      </div>
    </div>
  )
}
