import Image from "next/image"
import { useRouter } from "next/router"

import {
  auth,
  googleAuthProvider,
  facebookAuthProvider,
} from "../lib/firebaseConfig"
import {
  fetchSignInMethodsForEmail,
  signInWithEmailAndPassword,
  linkWithPopup,
  OAuthProvider,
  AuthProvider,
  linkWithCredential,
} from "firebase/auth"

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
          <h1 className='text-7xl xl:text-8xl font-bold'>Field</h1>
          <span className='text-3xl p-1  xl:text-4xl font-semibold'>
            Visualize Map & Marketplace.
          </span>
        </div>
        <SignInButton />
      </div>
    </div>
  )
}

const SignInButton = (): JSX.Element => {
  const router = useRouter()

  const promptUserForPassword = () => {
    toast.custom(
      <div className='border-2 border-black'>
        <form>
          <span>password:</span>
          <input />
        </form>
      </div>
    )
  }

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
        if ((err.code = "auth/account-exist-with-different-credential")) {
          const pendingCred = OAuthProvider.credentialFromError(err)
          const email = err.customData.email

          console.log(`signInWithFacebook pendingCred: ${pendingCred}`)
          console.log(`signInWithFacebook email: ${email}`)

          fetchSignInMethodsForEmail(auth, email).then((methods: any) => {
            console.log("[fetchSignInMethodsForEmail] methods:", methods)
            // if (methods[0] === "password") {
            //   var password = promptUserForPassword() // TODO: implement promptUserForPassword.
            //   signInWithEmailAndPassword(email, password)
            //     .then((res) => {
            //       return res.user.linkWithCredential(pendingCred)
            //     })
            //     .then(() => {
            //       router.push("")
            //     })
            //   return
            // }
            const getProviderForProviderId = (method: string) => {
              if (method === "google.com") {
                return googleAuthProvider
              } else if (method === "facebook.com") {
                return facebookAuthProvider
              }
            }
            // Construct provider object for that provider.
            const provider = getProviderForProviderId(methods[0])

            // @ts-ignore umm, how can i fix this?
            signInWithPopup(auth, provider).then((res) => {
              // link auth
              console.log("[signInWithFacebook, signInwithPopup] res:", res)
              console.log(
                "[signInWithFacebook, signInwithPopup] res.user:",
                res.user
              )
              // @ts-ignore umm, how can i fix this?
              linkWithCredential(res.user, pendingCred).then(() => {
                toast.success("successfully link acc")
                router.push("/login")
              })
              // res.user.linkWithCredential(pendingCred).then((usercred: any) => {
              //   router.push("/login")
              // })
            })
          })
        }
        alert(`[signInWithFacebook] Error: ${err.message}`)
        console.log(`[signInWithFacebook] Error.message: ${err.message}`)
        console.log(`[signInWithFacebook] Error.code: ${err.code}`)

        console.log(`[signInWithFacebook] Error: ${err}`)
      })
  }
  return (
    <>
      <button
        className='m-4 bg-white text-black p-2 xl:p-4 py-1 xl:py-2 flex items-center text-center content-center font-bold rounded-lg cursor-pointer '
        onClick={signInWithGoogle}
      >
        <Image
          src={"/icon/icon8/google.svg"}
          className='w-[30px] mr-[10px]'
          alt='google sign-in icon'
          width={30}
          height={30}
        />
        Sign in with Google
      </button>
      <button
        className='m-4 bg-[#3b5998] text-white p-2 xl:p-4 py-1 xl:py-2 flex items-center text-center content-center font-bold rounded-lg cursor-pointer '
        onClick={signInWithFacebook}
      >
        <Image
          src={"/icon/icon8/facebook.svg"}
          className='w-[30px] mr-[10px]'
          width={30}
          height={30}
          alt='facebook sign-in icon'
        />
        Sign in with Facebook
      </button>
    </>
  )
}
