import type { DocumentData } from "firebase/firestore/lite"

import { initializeApp } from "firebase/app"
import * as firestore from "firebase/firestore/lite"

interface ActualDocumentData extends DocumentData {
  id: string
  updated: {
    nanoseconds: number
    seconds: number
  }
}

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
async function getDoc<T extends ActualDocumentData = ActualDocumentData>(
  collectionName: string,
  docId: string
): Promise<T | undefined> {
  const docRef = firestore.doc(db, collectionName, docId)
  const docSnap = await firestore.getDoc(docRef)
  return docSnap.data() as T | undefined
}

// Get multiple docs
async function getDocs<T extends ActualDocumentData = ActualDocumentData>(
  collectionName: string
): Promise<T[]> {
  const collectionData = firestore.collection(db, collectionName)
  const collectionSnapshot = await firestore.getDocs(collectionData)
  return collectionSnapshot.docs.map(_doc => _doc.data() as T)
}

// Set single doc
async function setDoc<T extends Pick<ActualDocumentData, "id"> = Pick<ActualDocumentData, "id">>(
  collectionName: string,
  doc: T
): Promise<void> {
  await firestore.setDoc(firestore.doc(db, collectionName, doc.id), {
    ...doc,
    updated: firestore.serverTimestamp()
  })
}

// Set multiple docs
async function setDocs<T extends Pick<ActualDocumentData, "id"> = Pick<ActualDocumentData, "id">>(
  collectionName: string,
  docs: T[]
): Promise<void> {
  for (const doc of docs) {
    await setDoc(collectionName, doc)
  }
}

async function deleteDoc(collectionName: string, docId: string): Promise<void> {
  await firestore.deleteDoc(firestore.doc(db, collectionName, docId))
}

async function deleteDocs(collectionName: string, docIds: string[]): Promise<void> {
  await Promise.all(
    docIds.map(docId => firestore.deleteDoc(firestore.doc(db, collectionName, docId)))
  )
}

export { deleteDoc, deleteDocs, getDoc, getDocs, setDoc, setDocs }
