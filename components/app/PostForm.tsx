import { useState, useEffect } from "react"
// import Link from "next/link"
import MapMarkerer from "./MapMarkerer"
import ImageUploader from "./ImageUploader"
import { Post, ServicesType, ProvincesType } from "../../utils/types"

import {
  writeBatch,
  doc,
  serverTimestamp,
  updateDoc,
  getFirestore,
} from "firebase/firestore"

import { firestore } from "../../lib/firebaseConfig"
import { useForm } from "react-hook-form"
import ReactMarkdown from "react-markdown"
import toast from "react-hot-toast"
import { useRouter } from "next/router"

export default function PostForm({
  defaultValues,
  postRef,
  post,
  preview,
  setPreview,
}: {
  defaultValues: any
  postRef: any
  post: any
  preview: boolean
  setPreview: (preview: boolean) => void
}) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState,
    formState: { errors },
  } = useForm({
    defaultValues: {
      streetAddress1: defaultValues?.address.streetAddress1,
      streetAddress2: defaultValues?.address.streetAddress2,
      district: defaultValues?.address.district,
      locality: defaultValues?.address.locality,
      province: defaultValues?.address.province,
      zipCode: defaultValues?.address.zipCode,
      country: defaultValues?.address.country,
      content: defaultValues?.content,
      phone: defaultValues?.phone,
      photoUrl: defaultValues?.photoUrl,
      price: defaultValues?.price,
      published: defaultValues?.published,
      typeOfService: defaultValues?.typeOfService,
    },
    mode: "onChange",
  })

  const router = useRouter()

  const _streetAddress1 = watch("streetAddress1")
  const _streetAddress2 = watch("streetAddress2")
  const _district = watch("district")
  const _locality = watch("locality")
  const _province = watch("province")
  const _zipCode = watch("zipCode")
  const _country = watch("country")

  const [miniMapCoor, setMiniMapCoor] = useState(
    defaultValues.address.coordinate || {
      lat: 13.7563,
      lng: 100.5018,
    }
  )
  const [address, setAddress] = useState({ formatted_address: "" })
  const [downloadURL, setDownloadURL] = useState(null)

  useEffect(() => {
    if (defaultValues.photoUrl !== null) {
      setDownloadURL(defaultValues.photoUrl)
    }
  }, [])

  useEffect(() => {
    setAddress({
      formatted_address:
        _streetAddress1 +
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
    _streetAddress1,
    _streetAddress2,
    _district,
    _locality,
    _province,
    _zipCode,
    _country,
  ])

  const { isDirty } = formState

  function deleteWarning() {
    toast((t) => (
      <div className='bg- w-[30vh] flex justify-center align-center content-center'>
        <h1 className='font-bold text-lg my-auto'>Are you sure?</h1>
        <button
          className='ml-auto p-1 text-md font-medium'
          onClick={deletePost}
        >
          Yes
        </button>
        <button
          className='m-3 p-1 text-md font-medium'
          onClick={() => toast.dismiss(t.id)}
        >
          No
        </button>
      </div>
    ))
  }

  const updatePost = async ({
    phone,
    price,
    content,
    published,
    streetAddress1,
    streetAddress2,
    district,
    locality,
    province,
    country,
    zipCode,
    typeOfService,
  }: {
    phone: string
    price: string
    content: string
    published: boolean
    streetAddress1: string
    streetAddress2: string | null
    district: string
    locality: string
    province: ProvincesType
    country: string
    zipCode: string
    typeOfService: ServicesType
  }) => {
    const batch = writeBatch(getFirestore())
    const _province = post?.address?.province
    const _slug = post?.slug

    // ref to post in provinces
    const provincePostRef = doc(
      getFirestore(),
      "provinces",
      _province,
      "posts",
      _slug
    )

    batch.update(postRef, {
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
      typeOfService,
      phone,
      price,
      photoUrl: downloadURL,
      content,
      published,
      updatedAt: serverTimestamp(),
    })

    batch.update(provincePostRef, {
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
      typeOfService,
      phone,
      price,
      photoUrl: downloadURL,
      content,
      published,
      updatedAt: serverTimestamp(),
    })

    await batch
      .commit()
      .then(() => {
        toast.success("Post updated successfully!")
      })
      .catch((err) => alert("Commit Batch Error:" + err))

    reset({ content, published })
    router.push(`/${post.username}`)
  }

  const deletePost = async () => {
    const batch = writeBatch(getFirestore())
    const _province = post?.address?.province
    const _slug = post?.slug

    // ref to post in provinces
    const provincePostRef = doc(
      getFirestore(),
      "provinces",
      _province,
      "posts",
      _slug
    )

    batch.delete(postRef)
    batch.delete(provincePostRef)

    await batch.commit().then(() => {
      alert("Successfully delete post!")
      toast.dismiss()
      router.push(`/${post.username}`)
    })
  }

  return (
    <form onSubmit={handleSubmit(updatePost)} className='w-full max-w-xl'>
      <div className='flex flex-col'>
        <div className=''>
          <div>
            <h1 className='text-xl font-bold mb-5 underline'>
              Post Address (????????????????????????????????????????????????/??????????????????/??????????????????)
            </h1>
            {/* Address line 1 */}
            <div className='flex flex-wrap -mx-3 mb-2'>
              <div className='w-full px-3'>
                <label className='block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2'>
                  Address line 1 (??????????????????????????????????????? 1)
                </label>
                <input
                  className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                  id='streetAddress1'
                  type='text'
                  placeholder='streetAddress1 . . .'
                  {...register("streetAddress1", {
                    maxLength: { value: 50, message: "content is too long" },
                    minLength: { value: 8, message: "content is too short" },
                    required: { value: false, message: "content is required" },
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
                <label className='block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2'>
                  Address line 2 (??????????????????????????????????????? 2)
                </label>
                <input
                  className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                  id='streetAddress2'
                  type='text'
                  placeholder='streetAddress2 . . . '
                  {...register("streetAddress2", {
                    maxLength: { value: 50, message: "content is too long" },
                    minLength: { value: 10, message: "content is too short" },
                  })}
                />
                {/* {errors.streetAddress2 && (
                  <p className='font-bold text-red-600'>
                    {errors.streetAddress2.message}
                  </p>
                )} */}
              </div>
            </div>

            {/* district/sub-locality, locality, province */}
            <div className='flex flex-wrap -mx-3 mb-2'>
              <div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
                <label className='block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2'>
                  District (????????????/????????????)
                </label>
                <input
                  className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                  id='district'
                  type='text'
                  placeholder='district'
                  {...register("district", {
                    maxLength: { value: 30, message: "content is too long" },
                    minLength: { value: 2, message: "content is too short" },
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
                <label className='block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2'>
                  locality (???????????????/?????????)
                </label>
                <input
                  className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                  id='locality'
                  type='text'
                  placeholder='locality'
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
                <label className='block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2'>
                  Province (?????????????????????)
                </label>
                <div className='relative'>
                  <select
                    className='block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                    defaultValue='Bangkok'
                    id='province'
                    {...register("province", {
                      required: { value: true, message: "content is required" },
                    })}
                  >
                    <option value='Amnat Charoen'>
                      Amnat Charoen(??????????????????????????????)
                    </option>
                    <option value='Ang Thong'>Ang Thong (?????????????????????)</option>
                    <option value='Bangkok'>Bangkok (????????????????????????)</option>
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
                    <option value='Nakhon Pathom'>
                      Nakhon Pathom (??????????????????)
                    </option>
                    <option value='Mukdahan'>Mukdahan (????????????????????????)</option>
                    <option value='Nakhon Phanom'>
                      Nakhon Phanom (??????????????????)
                    </option>
                    <option value='Nakhon Ratchasima'>
                      Nakhon Ratchasima (???????????????????????????????????????)
                    </option>
                    <option value='Nakhon Sawan'>
                      Nakhon Sawan (???????????????????????????)
                    </option>
                    <option value='Nakhon Si Thammarat'>
                      Nakhon Si Thammarat (???????????????????????????????????????)
                    </option>
                    <option value='Nan'>Nan (????????????)</option>
                    <option value='Narathiwat'>Narathiwat (????????????????????????)</option>
                    <option value='Nong Bua Lumphu'>
                      Nong Bua Lumphu (?????????????????????????????????)
                    </option>
                    <option value='Nong Khai'>Nong Khai (?????????????????????)</option>
                    <option value='Pathum Thani'>
                      Pathum Thani (????????????????????????)
                    </option>
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
                    <option value='Sakhon Nakhon'>
                      Sakhon Nakhon (??????????????????)
                    </option>
                    <option value='Samut Prakan'>
                      Samut Prakan (?????????????????????????????????)
                    </option>
                    <option value='Samut Sakhon'>
                      Samut Sakhon (???????????????????????????)
                    </option>
                    <option value='Sara Buri'>Sara Buri (?????????????????????)</option>
                    <option value='Satun'>Satun (????????????)</option>
                    <option value='Sing Buri'>Sing Buri (???????????????????????????)</option>
                    <option value='Sisaket'>Sisaket (????????????????????????)</option>
                    <option value='Songkhla'>Songkhla (???????????????)</option>
                    <option value='Sukhothai'>Sukhothai (?????????????????????)</option>
                    <option value='Suphan Buri'>
                      Suphan Buri (??????????????????????????????)
                    </option>
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
                    <option selected>Bangkok</option>
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
                <label className='block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2'>
                  Zip (????????????????????????????????????)
                </label>
                <input
                  className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                  id='grid-zip'
                  type='text'
                  placeholder='zipCode'
                  {...register("zipCode", {
                    required: { value: true, message: "content is required" },
                  })}
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

          {/* Type, Price */}
          <div className='flex flex-wrap -mx-3 mb-2'>
            <div className='w-1/2 pt-3 px-3 mb-6 md:mb-0'>
              <label className='block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2'>
                Type (?????????????????????????????????????????????)
              </label>
              <div className='relative'>
                <select
                  className='block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                  defaultValue={
                    defaultValues.typeOfService
                      ? defaultValues.typeOfService
                      : "vacant_land"
                  }
                  id='typeOfService'
                  placeholder='typeOfService'
                  {...register("typeOfService", {
                    required: { value: true, message: "content is required" },
                  })}
                >
                  <option value='vacant_land'>Vacant Land (?????????????????????????????????)</option>
                  <option value='real_estate'>Real Estate (????????????)</option>
                  <option value='property'>
                    Property (????????????????????????????????????????????????????????????????????????)
                  </option>
                  <option value='service'>Service (??????????????????)</option>
                </select>
                {errors.typeOfService && (
                  <p className='font-bold text-red-600'>
                    {`${errors.typeOfService.message}`}
                  </p>
                )}
                <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
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
            <div className='w-1/2 pt-3 px-3 mb-6 md:mb-0'>
              <label className='block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2'>
                Price (????????????)
              </label>
              <div className='relative'>
                <input
                  className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                  id='price'
                  type='text'
                  placeholder='price'
                  {...register("price", {
                    required: { value: true, message: "content is required" },
                  })}
                />
                {errors.price && (
                  <p className='font-bold text-red-600'>
                    {`${errors.price.message}`}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Phone, Photo */}
          <div className='flex flex-wrap -mx-3 mb-2'>
            <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
              <label className='block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2'>
                Phone (????????????????????????)
              </label>
              <input
                className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                id='grid-first-name'
                type='text'
                placeholder='307-123-7898'
                {...register("phone", {
                  maxLength: { value: 14, message: "content is too long" },
                  minLength: { value: 8, message: "content is too short" },
                  required: { value: true, message: "content is required" },
                })}
              />
              {errors.phone && (
                <p className='font-bold text-red-600'>{`${errors.phone.message}`}</p>
              )}
            </div>
            <div className='w-full md:w-1/2 px-3'>
              <label className='block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2'>
                Image (??????????????????)
              </label>
              <ImageUploader
                downloadURL={downloadURL}
                setDownloadURL={setDownloadURL}
              />
            </div>
          </div>

          {/* Content */}
          <div>
            <label className='block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2'>
              Content (?????????????????????)
            </label>
            {preview && (
              <div className='p-[2rem] bg-white border-2 border-black rounded-md'>
                <ReactMarkdown>{watch("content")}</ReactMarkdown>
              </div>
            )}
            <textarea
              {...register("content", {
                maxLength: { value: 20000, message: "content is too long" },
                minLength: { value: 10, message: "content is too short" },
                required: { value: true, message: "content is required" },
              })}
              className={
                preview
                  ? "hidden"
                  : "h-[15vh] w-full p-[0.5rem] border-2 border-black"
              }
            ></textarea>
            <div className='flex'>
              <i>
                <a
                  target='_blank'
                  href='https://www.markdownguide.org/cheat-sheet/'
                  className='text-blue-600 underline'
                >
                  learn more
                </a>
                {" about how to use Markdown"}
              </i>
              <button
                type='button'
                onClick={() => setPreview(!preview)}
                className='min-w-40 max-w-44 ml-auto m-1 p-1 border-2 border-black rounded-lg hover:opacity-70'
              >
                {preview ? "Edit" : "Preview"}
              </button>
            </div>
            {errors.content && (
              <p className='font-bold text-red-600'>{`${errors.content.message}`}</p>
            )}
          </div>
        </div>
        <fieldset className='m-2 ml-auto'>
          <input
            className='inline mr-1 cursor-pointer'
            type='checkbox'
            checked
            {...register("published")}
          />
          <label>Published</label>
        </fieldset>

        <div className='grid grid-cols-2 gap-2 mt-4 mb-8'>
          <button
            type='button'
            className='font-semibold p-1 bg-red-700 border-b-4 border-black hover:bg-red-500  rounded-lg disabled:opacity-75'
            onClick={deleteWarning}
          >
            Delete Post
          </button>
          <button
            type='submit'
            className='font-semibold text-white p-1 bg-green-700 border-b-4 border-black hover:bg-green-500  rounded-lg disabled:opacity-75'
            disabled={!isDirty}
          >
            Save Change
          </button>
        </div>
      </div>
    </form>
  )
}
