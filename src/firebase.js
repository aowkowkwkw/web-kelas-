// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore"

import {getAuth, GoogleAuthProvider} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAFvBEg1T8Nha6eHa-ormDeYRvd2ezuYY8",
  authDomain: "web-kelas-d3181.firebaseapp.com",
  projectId: "web-kelas-d3181",
  storageBucket: "web-kelas-d3181.appspot.com",
  messagingSenderId: "842309356100",
  appId: "1:842309356100:web:f816770d35f0d9375f0a11",
  measurementId: "G-TDX6CR0H05"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();