import { useState, useContext, useEffect } from "react"
// import Link from "next/link"
import UserProfile from "../../components/app/UserProfile"
import UserForm from "../../components/app/UserForm"
import PostsFeed from "../../components/app/PostsFeed"
import Navbar2 from "../../components/app/Navbar2"

import { Post } from "../../utils/types"
import {
  getUserWithUsername,
  postToJSON,
  firestore,
} from "../../lib/firebaseConfig"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { UserContext } from "../../lib/context"
import {
  query,
  collection,
  where,
  getDocs,
  limit,
  orderBy,
  getFirestore,
} from "firebase/firestore"

export async function getServerSideProps({ query: urlQuery }: { query: any }) {
  const { username } = urlQuery

  const userDoc = await getUserWithUsername(username)

  // If no user, short circuit to 404 page
  if (!userDoc) {
    return { notFound: true }
  }

  // JSON serializable data
  let user = null
  let posts = null

  if (userDoc) {
    user = postToJSON(userDoc)
    // user = userDoc.data()

    const postQuery = query(
      collection(getFirestore(), userDoc.ref.path, "posts"),
      where("published", "==", true),
      orderBy("createdAt", "desc"),
      limit(20)
    )
    posts = (await getDocs(postQuery)).docs.map(postToJSON)
  }
  return {
    props: { user, posts }, // will be passed to the page component as props
  }
}

// We use getSeverSideProp to get data from our firestore 
// and validate it the username from useContext
// this confirm us whether or not the user is the owner of the profile (admin)


export default function UserProfilePage({
  user,
  posts,
}: {
  user: any
  posts: Post[]
}): JSX.Element {
  const [admin, setAdmin] = useState(false)
  const [editing, setEditing] = useState(false)

  const { username } = useContext(UserContext)
  useEffect(() => {
    {
      username === user.username && setAdmin(true)
    }
  }, [username])

  return (
    <div>
      <Navbar2 />
      <main className='h-fit w-full flex justify-center items-center'>
        <div className='h-full flex flex-col'>
          <UserProfile
            user={user}
            admin={admin}
            editing={editing}
            setEditing={setEditing}
          />
          {editing && (
            <UserForm user={user} username={username} setEditing={setEditing} />
          )}
          <PostsFeed posts={posts} admin={admin} />
        </div>
      </main>
    </div>
  )
}
