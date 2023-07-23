import { useState, useEffect, useContext } from "react"
import { useRouter } from "next/router"
import Link from "next/link"

import { auth, firestore } from "../../lib/firebaseConfig"
import {
  getFirestore,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore"

// import {
//   useDocumentDataOnce,
//   useDocumentData,
// } from "react-firebase-hooks/firestore"
import { useDocumentDataOnce } from "../../lib/hooks"
import { UserContext } from "../../lib/context"
import PostForm from "../../components/app/PostForm"
import AuthCheck from "../../components/app/AuthCheck"
import Navbar2 from "../../components/app/Navbar2"

export default function AdminPostPage(): JSX.Element {
  return (
    <AuthCheck>
      <Navbar2 />
      <PostManager />
    </AuthCheck>
  )
}

function PostManager(): JSX.Element {
  const [preview, setPreview] = useState(false)
  const [admin, setAdmin] = useState(false)

  const router = useRouter()
  const { slug } = router.query as { slug: string }
  const uid: any = auth?.currentUser?.uid

  const postRef = doc(getFirestore(), "users", uid, "posts", slug)
  const [post] = useDocumentDataOnce(postRef)

  const { username } = useContext(UserContext)

  useEffect(() => {
    username === post?.username && setAdmin(true)
  }, [username, post])

  return (
    <main className='h-full mt-14 text-lg'>
      {!post && 
      <div className="flex justify-center items-center">
        <p className="font-bold">404 Post not found . . . </p>
      </div>
        }

      {post && !admin && <div className="flex justify-center items-center">
        <p className="font-bold"> You have no authorize to Edit . . . </p>
      </div>
      }
      {post && admin && (
        <div className='flex'>
          <section className='max-w-[55vw] h-full'>
            <div className='mb-4'>
              <h1 className='text-4xl font-bold'>{post.title}</h1>
              <p>Post ID: {post.slug}</p>
            </div>
            <PostForm
              post={post}
              postRef={postRef}
              defaultValues={post}
              preview={preview}
              setPreview={setPreview}
            />
          </section>

          <aside className='flex flex-col w-[20vw] min-w-[250px] min-h-[200px] sticky'>
            {/* <h3 className='text-xl font-semibold mb-3 '>Tools</h3> */}
            <Link href={`/${post.username}/${post.slug}`}>
              <button className='min-w-40 max-w-44 mx-auto bg-sky-700 border-b-2 border-sky-900 hover:bg-sky-500  hover:border-sky-700  text-white ml-4 mt-4 p-2 rounded-lg font-semibold'>
                Live view
              </button>
            </Link>
          </aside>
        </div>
      )}
    </main>
  )
}
