// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getAuth, GoogleAuthProvider} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAKybFuG3ZrrWlqX5g2va2-QxWW01nZBCg",
  authDomain: "whatsapp-clone-72bc4.firebaseapp.com",
  projectId: "whatsapp-clone-72bc4",
  storageBucket: "whatsapp-clone-72bc4.appspot.com",
  messagingSenderId: "695081689554",
  appId: "1:695081689554:web:bb4437d695bac4800b280b",
  measurementId: "G-195EV3XC8F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore();
const auth = getAuth();
const provider = new GoogleAuthProvider();
export { db, auth, provider };
