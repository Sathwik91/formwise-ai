// lib/firebaseUser.ts
import { getFirestore, doc, getDoc } from 'firebase/firestore'
import { app } from './firebase'

const db = getFirestore(app)

export async function getUserRole(uid: string): Promise<'admin' | 'user' | null> {
  const userRef = doc(db, 'users', uid)
  const snapshot = await getDoc(userRef)

  if (!snapshot.exists()) return null

  const data = snapshot.data()
  return data.role === 'admin' ? 'admin' : 'user'
}
