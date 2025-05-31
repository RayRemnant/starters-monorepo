const { initializeApp /* firestore */ } = require("firebase/app")
const firestore = require("firebase/firestore/lite")

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
async function getDoc(collectionName, docId) {
  const docRef = firestore.doc(db, collectionName, docId)
  const docSnap = await firestore.getDoc(docRef)
  return docSnap.exists() ? docSnap.data() : {}
}

// Get multiple docs
async function getDocs(collectionName) {
  const collectionData = firestore.collection(db, collectionName)
  const collectionSnapshot = await firestore.getDocs(collectionData)
  return collectionSnapshot.docs.map(_doc => _doc.data())
}

// Set single doc
async function setDoc(collectionName, doc) {
  return await firestore.setDoc(firestore.doc(db, collectionName, doc.id), {
    ...doc,
    updated: firestore.serverTimestamp()
  })
}

// Set multiple docs
async function setDocs(collectionName, docs) {
  //consider integrating batch for more efficient operation
  //var batch = db.batch();
  //batch.commit();

  docs.forEach(doc => setDoc(collectionName, doc))
}

module.exports = { getDoc, getDocs, setDoc, setDocs }
