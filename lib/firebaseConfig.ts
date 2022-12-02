import { initializeApp, getApp, FirebaseOptions } from "firebase/app"
// import { getAnalytics } from "firebase/analytics"
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth"
import {
  getFirestore,
  collection,
  where,
  getDocs,
  query,
  limit,
} from "firebase/firestore"
import { getStorage } from "firebase/storage"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyDy50qUEvkn-6h7pM0oMzS8svO_qeGiu5o",
  authDomain: "map-app-f215b.firebaseapp.com",
  projectId: "map-app-f215b",
  storageBucket: "map-app-f215b.appspot.com",
  messagingSenderId: "789952193939",
  appId: "1:789952193939:web:0248b0ddf150c884dd7466",
  measurementId: "G-8F7VTK6C01",
}

// Initialize Firebase
function createFirebaseApp(config: FirebaseOptions) {
  try {
    return getApp()
  } catch {
    return initializeApp(config)
  }
}

const firebaseApp = createFirebaseApp(firebaseConfig)

// Google analytics
// const analytics = getAnalytics(app)

// Auth exports
export const auth = getAuth(firebaseApp)
export const googleAuthProvider = new GoogleAuthProvider()
export const facebookAuthProvider = new FacebookAuthProvider()

// Firestore exports
export const firestore = getFirestore(firebaseApp)

// Storage exports
export const storage = getStorage(firebaseApp)
export const STATE_CHANGE = "state_changed"

// Helper functions

/**
 * Gets a users/{uid} document with username
 * @param {string} username
 */
 export async function getUserWithUsername(username: string): Promise<any> {
  // userRef = collection("user")
  // const query = userRef.where("username", "==", username).limit(1)

  const q = query(
    collection(firestore, "users"),
    where("username", "==", username),
    limit(1)
  )

  const userDoc = (await getDocs(q)).docs[0]
  return userDoc
}

/**
 * Convert a fireStore document to JSON
 * @param {DocumentSnapShot} doc
 */

export function postToJSON(doc: any) {
  const data = doc.data()
  return {
    ...data,
    // firestore timestamp NOT serializable to JSON. Must convert to milliseconds
    createdAt: data?.createdAt.toMillis() || 0,
    updatedAt: data?.updatedAt.toMillis() || 0,
  }
}