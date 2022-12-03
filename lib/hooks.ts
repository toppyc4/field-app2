import { useEffect, useState, useRef } from "react"

// import { useAuthState } from "react-firebase-hooks/auth"

import { auth } from "./firebaseConfig"
import { doc, DocumentData,
  DocumentReference,
  getDoc,
  getFirestore,
  onSnapshot,
  Query,
  QueryDocumentSnapshot,
  QuerySnapshot } from "firebase/firestore"
import { Auth, onIdTokenChanged, User} from 'firebase/auth'



export const useUserData = (): {user: User | null, username: string | null } => {
  const [user] = useAuthState(auth)
  const [username, setUsername] = useState(null)

  useEffect(() => {
    // turn off realtime subscription
    let unsubscribe

    if (user) {
      const ref = doc(getFirestore(), "users", user.uid)
      unsubscribe = onSnapshot(ref, (snapshot) => {
        if (snapshot) setUsername(snapshot.data()?.username)
      })
    } else {
      setUsername(null)
    }

    return unsubscribe
  }, [user])

  return { user, username }
}

// added this due to problems with react-firebase-hooks (copied form [TS]-next13fire)
export function useAuthState(auth: Auth): (User | null)[] {
  const [user, setCurrentUser] = useState<User | null>(null)

  useEffect(() => {
    return onIdTokenChanged(auth, (_user) => {
      setCurrentUser(_user ?? null)
    })
  }, [auth])
  return [user]
}

export function useDocument(ref: DocumentReference): (QueryDocumentSnapshot | null)[] {
  const [_doc, _setDoc] = useState<QueryDocumentSnapshot | null>(null);

  const docRef = useRef(ref);

  useEffect(() => {
      return onSnapshot(docRef.current, (snap) => {
          _setDoc(snap.exists() ? snap : null);
      });
  }, [docRef]);
  return [_doc];
}

export function useDocumentData(ref: DocumentReference): (DocumentData | null)[] {
  const [_doc, setDoc] = useState<DocumentData | null>(null);

  const docRef = useRef(ref);

  useEffect(() => {
      return onSnapshot(docRef.current, (snap) => {
          setDoc(snap.exists() ? snap.data() : null);
      });
  }, [docRef]);
  return [_doc];
}

export function useDocumentDataOnce(ref: DocumentReference): (DocumentData | null)[] {
  const [_doc, setDoc] = useState<DocumentData | null>(null);

  const docRef = useRef(ref);

  useEffect(() => {
      getDoc(docRef.current).then(snap => {
          setDoc(snap.exists() ? snap.data() : null);
      });
      return;
  }, [docRef]);
  return [_doc];
}