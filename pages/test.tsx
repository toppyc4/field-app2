import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const test = () => {
  return (
    <>
    <div className='max-w-sm max-h-[70vh] overflow-hidden shadow-lg'>
      <div className='relative min-h-[20vh] max-h-[24vh] bg-black'>
        <Image
          className=' object-contain'
          src="/Markers/location-blue-marker.svg"
          layout='fill'
          alt='testing img'
        />
        {/* <img 
          className='w-full max-w-sm max-h-[20vh] bg-black'
          src="/Markers/location-blue-marker.svg"
        /> */}
      </div>
      <div className='px-6 py-2'>
        <header className='flex flex-wrap'>
          <p className='font-bold uppercase text-md max-h-20 overflow-hidden mb-2'>
            Testing
          </p>
        </header>
        <div className='flex'>
          <span className=' inline-block bg-lime-50 rounded-full ml-auto px-3 py-1 text-md text-slate-900 mb-1'>
            💸: 69 h
          </span>
        </div>
        {/* <p className='my-2 p-2 max-h-20 overflow-auto bg-white text-slate-900 text-base'>
          {post.content}
        </p> */}
        <p className='flex my-2 p-2 bg-gray-300 rounded-lg'>
          <img
            src='/Markers/location-blue-marker.svg'
            className='mt-1 mr-1 w-[25px] h-[25px]'
          />

          420/69 sweetest home
          {/* <b className='text-md'>Address: </b>
          {`${post.address.streetAddress} ${post.address.district} ${post.address.locality} ${post.address.province} ${post.address.country} ${post.address.zipCode}`} */}
        </p>
        <div className='flex'>
          <Link href={`/`} className='flex items-center mt-2'>
            {/* <p className=' flex text-sm font-bold text-gray-900 leading-none'> */}
            <button className='bg-lime-500 hover:bg-lime-400 text-white font-bold py-1 px-2 border-solid border-b-4 border-lime-700 hover:border-lime-500 rounded'>
              @ joffrey
            </button>
            {/* </p> */}
          </Link>
          <span className='inline-block bg-gray-200 rounded-full ml-auto p-2 text-sm font-semibold text-gray-700'>
            📞: 000-000-0000
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
          <Link href={`/`} className=''>
            View detail
          </Link>
        </div>
      </footer>
    </div>

    {/* second card */}
    
    
    <div className="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700">
        <a href="#" >
            <div className='relative w-full h-[400px]'>
            <Image 
                className=" rounded-t-lg objext-contain" 
                src="https://flowbite.com/docs/images/blog/image-1.jpg" 
                alt=""
                layout='fill'
            />
            </div>
        </a>
        <div className="p-5">
            <a href="#">
                <h5 className="text-gray-900 font-bold text-2xl tracking-tight mb-2 dark:text-white">Noteworthy technology acquisitions 2021</h5>
            </a>
            <p className="font-normal text-gray-700 mb-3 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
            <a href="#" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Read more
                <svg className="-mr-1 ml-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            </a>
        </div>
    </div>
    </>
  )
}

export default test