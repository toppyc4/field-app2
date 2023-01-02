import React from "react"
import Image from "next/image"
import Link from "next/link"
// import { User } from "../../utils/types"

export default function UserProfile({
  user,
  admin,
  editing,
  setEditing,
}: {
  user: any
  admin: boolean
  editing: boolean
  setEditing: (editing: boolean) => void
}): JSX.Element {
  function handleSetEdit(): void {
    //@ts-ignore tcs is whiny here, but my app work . . .
    setEditing((edit: boolean) => !edit)
  }
  return (
    <div className='p-10 flex flex-col content-center text-center bg-white'>
      {admin && (
        <button
          className='bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-solid border-b-4 border-blue-700 hover:border-blue-500 rounded ml-auto'
          onClick={() => handleSetEdit()}
        >
          {editing ? "Hide Form" : "Update Profile"}
        </button>
      )}
      <div className='relative w-36 h-36 mx-auto'>
        <Image
          src={user?.photoURL || "/img/question-mark-profile.jpg"}
          className='block rounded-full'
          alt='user profile image'
          fill
        />
      </div>
      <p className='m-1'>
        <i>@{user.username}</i>
      </p>

      <h1 className='m-2 text-2xl font-bold'>
        {user?.Fname || "Unknown real name"} {user?.Lname || ""}
      </h1>
      <div className='m-2 flex'>
        <p className='font-semibold text-lg'>Email: </p>
        <p className='ml-auto'>
          {user?.email ||
            "Unknown (please click update profile at top right corner)"}
        </p>
      </div>
      <div className='m-2 flex'>
        <p className='font-semibold text-lg'>Location: </p>
        <p className='ml-auto'>
          {user?.address?.province ||
            "Unknown (please click update profile at top right corner)"}
          , {user?.address?.country || ""}
        </p>
      </div>
      <div className='m-2 flex'>
        <p className='font-semibold text-lg'>Facebook account: </p>
        <div className='ml-auto'>
          <p className=''>
            {user?.Facebook ? (
              <button className='flex font-semibold text-white p-2 bg-indigo-600 hover:bg-indigo-400  rounded-lg disabled:opacity-75'>
                <Image
                  src={"/icon/icon8/facebook.svg"}
                  className='w-[30px] mr-[10px]'
                  width={30}
                  height={30}
                  alt='facebook sign-in icon'
                />
                <a target='_blank' href={`${user.Facebook}`}>
                  {user.Facebook}
                </a>
              </button>
            ) : (
              "Unknown Facebook account"
            )}
          </p>
        </div>
      </div>
      <div className='m-2 flex'>
        <p className='font-semibold text-lg'>Line Id: </p>
        <div className='ml-auto'>
          <p className='ml-auto'>
            {user?.Line ? (
              <button className='flex font-semibold text-white p-2 bg-green-600 hover:bg-green-400 rounded-lg disabled:opacity-75'>
                <Image
                  src={"/icon/icon8/line.svg"}
                  className='w-[30px] mr-[10px]'
                  width={30}
                  height={30}
                  alt='line sign-in icon'
                />
                <a target='_blank' href={`https://line.me/ti/p/~${user.Line}`}>
                  {user.Line}
                </a>
              </button>
            ) : (
              "Unknown Line Id"
            )}
          </p>
        </div>
      </div>
    </div>
  )
}
