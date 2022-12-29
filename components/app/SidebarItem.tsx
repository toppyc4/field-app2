import Link from "next/link"
import Image from "next/image"
import { Post, ServicesType } from "../../utils/types"

const SidebarItem = ({
  post,
  setSelectedMarker,
}: {
  post: Post
  setSelectedMarker: (marker: Post) => void
}): JSX.Element => {
  function iconType(type: ServicesType) {
    if (type === "vacant_land") {
      return "/icon/solid/solid-field-stack.svg"
    } else if (type === "real_estate") {
      return "/icon/solid/solid-home.svg"
    } else if (type === "property") {
      return "/icon/solid/solid-property.svg"
    } else if (type === "condomidium") {
      return "/icon/solid/solid-condo.svg"
    } else if (type === "product") {
      return "/icon/solid/solid-truck.svg"
    } else if (type === "service") {
      return "/icon/solid/solid-service.svg"
    }
  }

  function ScrollIntoView() {
    const div = window.document.getElementById(
      `p${post.address.coordinate.lat + post.address.coordinate.lng}`
    )
    div?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }

  return (
    <div
      className='max-w-sm max-h-[100vh] my-[0.5rem] bg-neutral-100 overflow-hidden shadow-lg'
      id={`p${post.address.coordinate.lat + post.address.coordinate.lng}`}
      onClick={() => {
        ScrollIntoView()
        setSelectedMarker(post)
      }}
    >
      <div className='relative w-full min-h-[20vh] bg-white'>
        {/* TODO: Click on photo and scroll into view instead of link */}
        <Link href={`/${post.username}`}>
          <Image
            className=' object-contain'
            src={
              post.photoUrl
                ? `${post.photoUrl}`
                : "/icon/location-blue-marker.svg"
            }
            fill
            alt={`${post.title}`}
          />
        </Link>
      </div>

      <div className='px-6 py-2'>
        <header className='flex flex-wrap'>
          <p className='font-bold uppercase text-md max-h-20 overflow-hidden mb-2'>
            {post.title}
          </p>
        </header>
        <div className='flex'>
          <span className=' inline-block bg-lime-50 rounded-full ml-auto px-3 py-1 text-md text-slate-900 mb-1'>
            💸: {post.price}
          </span>
        </div>
        {/* <p className='my-2 p-2 max-h-20 overflow-auto bg-white text-slate-900 text-base'>
          {post.content}
        </p> */}
        <div className='flex my-2 p-2 bg-gray-300 rounded-lg'>
          <div className='relative w-[25px] h-[25px] mt-0.5 mr-0.5'>
            <Image
              //@ts-ignore
              src={
                iconType(post.typeOfService) ||
                "/icon/location-black-marker.svg"
              }
              className=''
              alt='location-icon'
              fill
            />
          </div>

          {`${post.address.district}, ${post.address.locality}`}
          {/* <b className='text-md'>Address: </b>
          {`${post.address.streetAddress} ${post.address.district} ${post.address.locality} ${post.address.province} ${post.address.country} ${post.address.zipCode}`} */}
        </div>
        <div className='flex'>
          <Link href={`/${post.username}`} className='flex items-center mt-2'>
            <p className=' flex text-sm font-bold text-gray-900 leading-none'>
              <button className='bg-lime-500 hover:bg-lime-400 text-white font-bold py-1 px-2 border-solid border-b-4 border-lime-700 hover:border-lime-500 rounded'>
                @ {post.username}
              </button>
            </p>
          </Link>
          <span className='inline-block bg-gray-200 rounded-full ml-auto p-2 text-sm font-semibold text-gray-700'>
            📞: {post.phone}
          </span>
        </div>
      </div>
      <footer className='mt-auto px-2 pb-2 flex'>
        {/* <Link
            href={`/admin/${post.slug}`}
            className='text-blue-600 underline ml-4 cursor-pointer'
          >
            Edit
          </Link> */}
        <div className='text-blue-600 underline ml-auto mr-4 cursor-pointer'>
          <Link href={`/${post.username}/${post.slug}`} className=''>
            View detail
          </Link>
        </div>
      </footer>
    </div>
  )
}

export default SidebarItem
