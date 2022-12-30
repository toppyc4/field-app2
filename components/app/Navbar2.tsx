import React from "react"
import Link from "next/link"

export default function Navbar2(): JSX.Element {
  return (
    <nav className='sticky top-0 z-10 max-w-screen h-[8vh] bg-slate-800 px-[4vw] py-[1vh] flex justify-btween items-center drops-shadow-lg'>
      <Link href='/main'>
        <h1 className='text-5xl xl:text-[66px] font-bold text-white justify-self-start cursor-pointer '>
          Field
        </h1>
      </Link>
    </nav>
  )
}
