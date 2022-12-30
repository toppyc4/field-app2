import Image from "next/image"
import { useRouter } from "next/router"

import {
  auth,
  googleAuthProvider,
  facebookAuthProvider,
} from "../lib/firebaseConfig"
import { signInWithPopup } from "firebase/auth"

import toast from "react-hot-toast"

export default function Intro(): JSX.Element {
  return (
    <div className='h-[100vh] bg-fixed overflow-hidden flex'>
      <Image
        fill
        className='object-center object-cover pointer-events-none'
        src={"/pic/field.png"}
        alt='field bg'
      />
      <div className='mt-48 mb-auto ml-12 xl:ml-20 2xl:ml-32 z-10'>
        <div className='m-5'>
          <h1 className='text-8xl font-bold'>Field</h1>
          <span className='text-4xl font-semibold'>
            Visualize Map & Marketplace.
          </span>
        </div>
        <SignInButton />
        {/* <button className='mb-5'>h1</button>
        <button className=''>h2</button> */}
      </div>
    </div>
  )
}

const SignInButton = (): JSX.Element => {
  const router = useRouter()
  const signInWithGoogle = async () => {
    await signInWithPopup(auth, googleAuthProvider)
      .then(() => {
        router.push("/login")
        toast.success("Successfully Sign In! (w/ Google acc)")
      })
      .catch((err) => {
        alert(`signInWithGoogle Error: ${err.message}`)
      })
  }
  const signInWithFacebook = async () => {
    await signInWithPopup(auth, facebookAuthProvider)
      .then(() => {
        router.push("/login")
        toast.success("Successfully Sign In! (w/ Facebook acc)")
      })
      .catch((err) => {
        alert(`signInWithFacebook Error: ${err.message}`)
      })
  }
  return (
    <>
      <button
        className='m-5 white-btn bg-white text-black'
        onClick={signInWithGoogle}
      >
        <Image
          src={"/icon/google.png"}
          className='w-[30px] mr-[10px]'
          alt='sign-in with google logo'
          width={30}
          height={30}
        />
        Sign in with Google
      </button>
      {/* <button
            className='m-5 bg-[#4267B2] text-white'
            onClick={signInWithFacebook}
          >
            <img src={"/facebook-logo.svg"} className='w-[30px] mr-[10px]' />
            Sign in with Facebook
          </button> */}
    </>
  )
}
