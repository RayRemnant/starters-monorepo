import { initializeApp } from "firebase/app"
import * as firestore from "firebase/firestore/lite"

const firebaseConfig = {
  apiKey: process.env.apiKey,
  appId: process.env.appId,
  authDomain: process.env.authDomain,
  messagingSenderId: process.env.messagingSenderId,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket
}

const app = initializeApp(firebaseConfig)
const db = firestore.getFirestore(app)

// Get single doc
async function getDoc<T = unknown>(collectionName: string, docId: string): Promise<{} | T> {
  const docRef = firestore.doc(db, collectionName, docId)
  const docSnap = await firestore.getDoc(docRef)
  return docSnap.exists() ? (docSnap.data() as T) : {}
}

// Get multiple docs
async function getDocs<T = unknown>(collectionName: string): Promise<T[]> {
  const collectionData = firestore.collection(db, collectionName)
  const collectionSnapshot = await firestore.getDocs(collectionData)
  return collectionSnapshot.docs.map(_doc => _doc.data() as T)
}

// Set single doc
async function setDoc<T extends { id: string }>(collectionName: string, doc: T): Promise<void> {
  await firestore.setDoc(firestore.doc(db, collectionName, doc.id), {
    ...doc,
    updated: firestore.serverTimestamp()
  })
}

// Set multiple docs
async function setDocs<T extends { id: string }>(collectionName: string, docs: T[]): Promise<void> {
  for (const doc of docs) {
    await setDoc(collectionName, doc)
  }
}

export { getDoc, getDocs, setDoc, setDocs }
