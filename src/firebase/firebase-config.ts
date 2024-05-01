import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "gnb-gallery.firebaseapp.com",
  projectId: "gnb-gallery",
  storageBucket: "gnb-gallery.appspot.com",
  messagingSenderId: "424821146921",
  appId: "1:424821146921:web:cf9a6eff7c9ae058f46338",
  measurementId: "G-NQ9LRQ0F7R",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const imageDb = getStorage(app);
export const googleProvider = new GoogleAuthProvider();
