import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import MapMarkerer from "./MapMarkerer"

import { auth, firestore, getUserWithUsername } from "../../lib/firebaseConfig"
import {
  query,
  getFirestore,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore"

import { useForm } from "react-hook-form"
// import {
//   useDocumentDataOnce,
//   useDocumentData,
// } from "react-firebase-hooks/firestore"
import toast from "react-hot-toast"

export default function UserForm({
  user,
  username,
  setEditing,
}: {
  user: any
  username: string | null
  setEditing: (edit: boolean) => void
}) {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState,
    formState: { errors },
  } = useForm({
    defaultValues: {
      streetAddress1: user?.address?.streetAddress1,
      streetAddress2: user?.address?.streetAddress2,
      district: user?.address?.district,
      locality: user?.address?.locality,
      province: user?.address?.province,
      zipCode: user?.address?.zipCode,
      country: user?.address?.country,
      email: user?.email,
      Facebook: user?.Facebook,
      Line: user?.Line,
      // phone: user?.phone,
      price: user?.price,
      Fname: user?.Fname,
      Lname: user?.Lname,
      username: user?.username,
    },
    mode: "onChange",
  })

  const _streetAddress = watch("streetAddress1")
  const _streetAddress2 = watch("streetAddress2")
  const _district = watch("district")
  const _locality = watch("locality")
  const _province = watch("province")
  const _zipCode = watch("zipCode")
  const _country = watch("country")

  const [miniMapCoor, setMiniMapCoor] = useState(
    user?.address?.coordinate || {
      lat: 13.7563,
      lng: 100.5018,
    }
  )
  const [address, setAddress] = useState({ formatted_address: "" })

  useEffect(() => {
    setAddress({
      formatted_address:
        _streetAddress +
        " " +
        _streetAddress2 +
        ", " +
        _district +
        ", " +
        _locality +
        ", " +
        _province +
        ", " +
        _zipCode +
        ", " +
        _country,
    })
  }, [
    _streetAddress,
    _streetAddress2,
    _district,
    _locality,
    _province,
    _zipCode,
    _country,
  ])

  const { isDirty, isValid } = formState

  async function updateUser({
    // username,
    Fname,
    Lname,
    email,
    Facebook,
    Line,
    // password,
    streetAddress1,
    streetAddress2,
    district,
    locality,
    province,
    country,
    zipCode,
  }: {
    // username: any
    Fname: string
    Lname: string
    email: string
    Facebook: string
    Line: string
    streetAddress1: string
    streetAddress2: string | null
    district: any
    locality: any
    province: any
    country: any
    zipCode: any
  }) {
    const uid = auth?.currentUser?.uid
    const userRef = doc(getFirestore(), "users", uid!)

    await updateDoc(userRef, {
      // username,
      Fname,
      Lname,
      email,
      Facebook,
      Line,
      // password,
      address: {
        streetAddress1,
        streetAddress2,
        district,
        locality,
        province,
        country,
        zipCode,
        coordinate: { lat: miniMapCoor?.lat, lng: miniMapCoor?.lng },
      },
      updatedAt: serverTimestamp(),
    }).then(() => {
      toast.success("successfully updated infomation!")
      // router.refresh()
      setEditing(false)
      router.push(`/${username}`)
    })
  }

  return (
    <div className='flex flex-col mt-4 pb-10'>
      <h1 className='my-6 mx-auto font-bold text-2xl underline'>User's Form</h1>
      <form
        onSubmit={handleSubmit(updateUser)}
        className='mx-auto w-full max-w-xl'
      >
        <div>
          {/* First and Last Name */}
          <div className='flex flex-wrap -mx-3 mb-2'>
            <div className='w-full md:w-1/2 px-3 mb-0'>
              <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
                First Name (????????????????????????)
              </label>
              <input
                className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                id='grid-first-name'
                type='text'
                placeholder='Somchai'
                {...register("Fname", {
                  maxLength: { value: 21, message: "content is too long" },
                  minLength: { value: 3, message: "content is too short" },
                  required: { value: true, message: "content is required" },
                })}
              />
              {errors.Fname && (
                <p className='font-bold text-red-600'>{`${errors.Fname.message}`}</p>
              )}
            </div>
            <div className='w-full md:w-1/2 px-3'>
              <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
                Last Name (?????????????????????)
              </label>
              <input
                className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                id='Lname'
                type='text'
                placeholder='Mesuk'
                {...register("Lname", {
                  maxLength: { value: 21, message: "content is too long" },
                  minLength: { value: 2, message: "content is too short" },
                  required: { value: true, message: "content is required" },
                })}
              />
              {errors.Lname && (
                <p className='font-bold text-red-600'>{`${errors.Lname.message}`}</p>
              )}
            </div>
          </div>
          {/* Contract */}
          <div className='flex flex-wrap -mx-3 mb-6'>
            <div className='w-full px-3 mb-3 '>
              <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
                Email (???????????????)
              </label>
              <input
                className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                id='email'
                type='text'
                placeholder='Email'
                {...register("email", {
                  required: { value: true, message: "content is required" },
                })}
              />
              {errors.email && (
                <p className='font-bold text-red-600'>{`${errors.email.message}`}</p>
              )}
            </div>
            <div className='w-full  px-3 mb-3 '>
              <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
                Facebook (?????????????????? ??????????????????????????????????????????)
              </label>
              <input
                className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                id='facebook'
                type='text'
                placeholder='https://www.facebook.com/yourusername/'
                {...register("Facebook", {
                  required: { value: true, message: "content is required" },
                })}
              />
              {errors.email && (
                <p className='font-bold text-red-600'>{`${errors.email.message}`}</p>
              )}
            </div>
            <div className='w-full px-3 mb-3 '>
              <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
                Line Id (???????????? ??????????????? ??????????????????????????????????????????)
              </label>
              <input
                className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                id='line'
                type='text'
                placeholder='Line Id'
                {...register("Line", {
                  required: { value: true, message: "content is required" },
                })}
              />
              {errors.email && (
                <p className='font-bold text-red-600'>{`${errors.email.message}`}</p>
              )}
            </div>
          </div>
        </div>

        <div className=''>
          <h1 className='text-xl mb-5 underline'>
            Your Address (???????????????????????????????????????)
          </h1>

          {/* Address line 1 */}
          <div className='flex flex-wrap -mx-3 mb-2'>
            <div className='w-full px-3'>
              <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
                Address line 1 (??????????????????????????????????????? 1)
              </label>
              <input
                className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                id='streetAddress1'
                type='text'
                placeholder='939 Rama I Rd . . . '
                {...register("streetAddress1", {
                  maxLength: { value: 50, message: "content is too long" },
                  minLength: { value: 10, message: "content is too short" },
                  required: { value: true, message: "content is required" },
                })}
              />
              {errors.streetAddress1 && (
                <p className='font-bold text-red-600'>
                  {`${errors.streetAddress1.message}`}
                </p>
              )}
            </div>
          </div>
          {/* Address line 2 */}
          <div className='flex flex-wrap -mx-3 mb-2'>
            <div className='w-full px-3'>
              <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
                Address line 2 (??????????????????????????????????????? 2)
              </label>
              <input
                className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                id='streetAddress2'
                type='text'
                placeholder='optional . . .'
                {...register("streetAddress2")}
              />
              {errors.streetAddress2 && (
                <p className='font-bold text-red-600'>
                  {`${errors.streetAddress2.message}`}
                </p>
              )}
            </div>
          </div>

          {/* district/sub-locality, locality, provinve */}
          <div className='flex flex-wrap -mx-3 mb-2'>
            <div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
              <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
                District (????????????/????????????)
              </label>
              <input
                className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                id='district'
                type='text'
                placeholder='Wang Mai'
                {...register("district", {
                  maxLength: { value: 30, message: "content is too long" },
                  minLength: { value: 3, message: "content is too short" },
                  required: { value: false, message: "content is required" },
                })}
              />
              {errors.district && (
                <p className='font-bold text-red-600'>
                  {`${errors.district.message}`}
                </p>
              )}
            </div>
            <div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
              <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
                Locality (???????????????/?????????)
              </label>
              <input
                className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                id='locality'
                type='text'
                placeholder='Pathum Wan'
                {...register("locality", {
                  maxLength: { value: 30, message: "content is too long" },
                  minLength: { value: 3, message: "content is too short" },
                  required: { value: true, message: "content is required" },
                })}
              />
              {errors.locality && (
                <p className='font-bold text-red-600'>
                  {`${errors.locality.message}`}
                </p>
              )}
            </div>
            <div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
              <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
                Province (?????????????????????)
              </label>
              <div className='relative'>
                <select
                  className='block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                  id='province'
                  {...register("province", {
                    required: { value: true, message: "content is required" },
                  })}
                >
                  <option value='Amnat Charoen'>
                    Amnat Charoen (??????????????????????????????)
                  </option>
                  <option value='Ang Thong'>Ang Thong (?????????????????????)</option>
                  <option value='Bangkok' selected>
                    Bangkok (????????????????????????)
                  </option>
                  <option value='Buri Rum'>Buri Rum (???????????????????????????)</option>
                  <option value='Bueng Kan'>Bueng Kan (??????????????????)</option>
                  <option value='Chachoengsao'>
                    Chachoengsao (??????????????????????????????)
                  </option>
                  <option value='Chaiyaphum'>Chaiyaphum (?????????????????????)</option>
                  <option value='Chanthaburi'>Chanthaburi (????????????????????????)</option>
                  <option value='Chiang Mai'>Chiang Mai (???????????????????????????)</option>
                  <option value='Chiang Rai'>Chiang Rai (????????????????????????)</option>
                  <option value='Chonburi'>Chonburi (??????????????????)</option>
                  <option value='Chumphon'>Chumphon (???????????????)</option>
                  <option value='Kalasin'>Kalasin (???????????????????????????)</option>
                  <option value='Kamphaeng Phet'>
                    Kamphaeng Phet (???????????????????????????)
                  </option>
                  <option value='Kanchanaburi '>
                    Kanchanaburi (???????????????????????????)
                  </option>
                  <option value='Khon Kaen'>Khon Kaen (?????????????????????)</option>
                  <option value='Krabi'>Krabi (??????????????????)</option>
                  <option value='Loei'>Loei (?????????)</option>
                  <option value='Lumpang'>Lumpang (???????????????)</option>
                  <option value='Lumphun'>Lumphun (???????????????)</option>
                  <option value='Mae Hong Son'>
                    Mae Hong Son (??????????????????????????????)
                  </option>
                  <option value='Maha Sarakham'>
                    Maha Sarakham (???????????????????????????)
                  </option>
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
                  <option value='Phuket '>Phuket (??????????????????)</option>
                  <option value='Prachuap Khiri Khan'>
                    Prachuap Khiri Khan (?????????????????????????????????????????????)
                  </option>
                  <option value='Ranong'>Ranong (???????????????)</option>
                  <option value='Ratchaburi'>Ratchaburi (?????????????????????)</option>
                  <option value='Rayong'>Rayong (???????????????)</option>
                  <option value='Roi Et'>Roi Et (????????????????????????)</option>
                  <option value='Sa Kaeo'>Sa Kaeo (?????????????????????)</option>
                  <option value='Sakhon Nakhon'>Sakhon Nakhon (??????????????????)</option>
                  <option value='Samut Prakan'>
                    Samut Prakan (?????????????????????????????????)
                  </option>
                  <option value='Samut Sakhon'>Samut Sakhon (???????????????????????????)</option>
                  <option value='Sara Buri'>Sara Buri (?????????????????????)</option>
                  <option value='Satun'>Satun (????????????)</option>
                  <option value='Sing Buri'>Sing Buri (???????????????????????????)</option>
                  <option value='Sisaket'>Sisaket (????????????????????????)</option>
                  <option value='Songkhla'>Songkhla (???????????????)</option>
                  <option value='Sukhothai'>Sukhothai (?????????????????????)</option>
                  <option value='Suphan Buri'>Suphan Buri (??????????????????????????????)</option>
                  <option value='Surat Thani'>
                    Surat Thani (????????????????????????????????????)
                  </option>
                  <option value='Surin'>Surin (????????????????????????)</option>
                  <option value='Tak'>Tak (?????????)</option>
                  <option value='Trat'>Trat (????????????)</option>

                  <option value='Ubon Ratchath'>
                    Ubon Ratchath (?????????????????????????????????)
                  </option>
                  <option value='Udon Thani'>Udon Thani (????????????????????????)</option>
                  <option value='Uthai Thani'>Uthai Thani (???????????????????????????)</option>
                  <option value='Uttaradit'>Uttaradit (???????????????????????????)</option>
                  <option value='Yala'>Yala (????????????)</option>
                </select>
                <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
                  <svg
                    className='fill-current h-4 w-4'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 20 20'
                  >
                    <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
                  </svg>
                </div>
                {errors.province && (
                  <p className='font-bold text-red-600'>
                    {`${errors.province.message}`}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* zip, country */}
          <div className='flex flex-wrap -mx-3 mb-8'>
            <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
              <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
                Zip (????????????????????????????????????)
              </label>
              <input
                className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                id='grid-zip'
                type='text'
                placeholder='10330'
                {...register("zipCode")}
              />
              {errors.zipCode && (
                <p className='font-bold text-red-600'>
                  {`${errors.zipCode.message}`}
                </p>
              )}
            </div>
            <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
              <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
                country (??????????????????)
              </label>
              <div className='relative'>
                <select
                  className='block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                  id='country'
                  {...register("country", {
                    required: { value: true, message: "content is required" },
                  })}
                >
                  <option>Thailand</option>
                </select>
                <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
                  <svg
                    className='fill-current h-4 w-4'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 20 20'
                  >
                    <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
                  </svg>
                </div>
                {errors.country && (
                  <p className='font-bold text-red-600'>
                    {`${errors.country.message}`}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className='my-6'>
            <MapMarkerer
              address={address}
              miniMapCoor={miniMapCoor}
              setMiniMapCoor={setMiniMapCoor}
            />
          </div>
        </div>
        {/* submit button */}
        <div className='flex'>
          <button
            type='submit'
            className='w-4/5 mx-auto bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-1 px-2 border-solid border-b-4 border-emerald-700 hover:border-emerald-500 rounded cursor-pointer'
            disabled={!isDirty || !isValid}
          >
            Save Change
          </button>
        </div>
      </form>
    </div>
  )
}
