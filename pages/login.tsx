import { useCallback, useContext, useState, useEffect } from "react"
import { UserContext } from "../lib/context"
import { useRouter } from "next/router"

import {
  doc,
  writeBatch,
  getFirestore,
  getDoc,
  serverTimestamp,
} from "firebase/firestore"
import { auth } from "../lib/firebaseConfig"
import { signOut } from "firebase/auth"

import debounce from "lodash.debounce"
import toast from "react-hot-toast"

export default function login(): JSX.Element {
  const router = useRouter()
  const { user, username } = useContext(UserContext)
  console.log("[login]user: ", user)
  console.log("[login]username: ", username)

  if (user && username) {
    router.push("/main")
  }

  return (
    <main className='h-[100vh]'>
      {user && !username && <UsernameForm />}
      <h1>what?</h1>
    </main>
  )
}

// Sign out btn
export const SignOutButton = (): JSX.Element => {
  const router = useRouter()
  return (
    <button
      onClick={() =>
        signOut(auth).then(() => {
          router.push("/")
          toast.success("Successfully Sign Out!")
        })
      }
      className='bg-blue-500 hover:bg-blue-400 text-white font-semibold xl:font-bold py-0.5 lg:py-1 xl:py-2 px-1 lg:px-2 xl:px-4 border-solid border-b-4 border-blue-700 hover:border-blue-500 rounded'
    >
      Sign Out
    </button>
  )
}

// Username form
function UsernameForm(): JSX.Element | null {
  const [formValue, setFormValue] = useState("")
  const [isValid, setIsValid] = useState(false)
  const [loading, setLoading] = useState(false)

  const router = useRouter()
  const { user, username } = useContext(UserContext)

  const onSubmit = async (e: any) => {
    e.preventDefault()

    // Create ref for both documents
    const userDoc = doc(getFirestore(), "users", user.uid)
    const usernameDoc = doc(getFirestore(), "usernames", formValue)

    // Commit both docs together as a batch write.
    const batch = writeBatch(getFirestore())
    batch.set(userDoc, {
      username: formValue,
      photoURL: user.photoURL,
      displayName: user.displayName,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    })
    batch.set(usernameDoc, { uid: user.uid })

    await batch
      .commit()
      .then(() => {
        toast.success("batch!, Nice name!")
        router.push("/main")
      })
      .catch((e) => alert("Commit Batch Error:" + e))
  }

  // Organize input
  const onChange = (e: any) => {
    // Force form value typed in form to match correct format
    // \u0E00-\u0E7F is for Thai (cancelled)
    const val = e.target.value.toLowerCase()
    const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{4})[^_.].*[^_.]$/

    // Only set form value if length is < 3 OR it passses regex
    if (val.length < 3) {
      setFormValue(val)
      setLoading(false)
      setIsValid(false)
    }

    if (re.test(val)) {
      setFormValue(val)
      setLoading(true)
      setIsValid(false)
    }
  }

  useEffect(() => {
    checkUsername(formValue)
  }, [formValue])

  // Check username form database
  const checkUsername = useCallback(
    debounce(async (username) => {
      if (username.length >= 3) {
        const ref = doc(getFirestore(), "usernames", username)
        const snap = await getDoc(ref)
        console.log("Firestore read executed! snap exist?:", snap.exists())
        setIsValid(!snap.exists())
        setLoading(false)
      }
    }, 420),
    []
  )

  return (
    (!username && (
      <>
        <nav className='flex justify-end'>
          <button
            className='flex-shrink-0 border-transparent border-4 bg-slate-700 hover:bg-slate-900 border-slate-700 hover:border-slate-900 text-white text-sm m-10 mr-16 py-1 px-2 rounded'
            type='button'
            onClick={() => {
              router.push("/")
            }}
          >
            Cancel
          </button>
        </nav>
        <section className='h-[90%] flex mt-8 ml-40'>
          <div className=''>
            <h3 className='text-4xl mb-3'>Choose your username</h3>
            <form onSubmit={onSubmit} className='w-full max-w-sm'>
              <div className='flex items-center border-b border-teal-500 py-2'>
                <input
                  className='appearance-none bg-transparent border-none w-full text-gray-700 mr-3 px-2 leading-tight focus:outline-none'
                  name='username'
                  type='text'
                  placeholder='my-username'
                  value={formValue}
                  onChange={onChange}
                />
                <button
                  className='flex-shrink-0 text-teal-500 hover:text-teal-800 text-sm px-2 rounded cursor-pointer'
                  type='submit'
                  disabled={!isValid}
                >
                  Choose
                </button>
              </div>
              <UsernameMessage
                username={formValue}
                isValid={isValid}
                loading={loading}
              />
              <div className='mt-4'>
                <h3 className='text-md underline'>Debug state</h3>
                <div className='text-sm'>
                  Username: {formValue}
                  <br />
                  Username Valid: {isValid.toString()}
                  <br />
                  Loading: {loading.toString()}
                </div>
              </div>
            </form>
          </div>
        </section>
      </>
    )) ||
    null
  )
}

function UsernameMessage({
  username,
  isValid,
  loading,
}: {
  username: string
  isValid: boolean
  loading: boolean
}): JSX.Element {
  if (loading) {
    return <p>Checking...</p>
  } else if (isValid) {
    return (
      <p className='font-semibold text-green-600'>{username} is available!</p>
    )
  } else if (username && !isValid) {
    return <p className='font-semibold text-red-600'>That username is taken!</p>
  } else {
    return <p></p>
  }
}
