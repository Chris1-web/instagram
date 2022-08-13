// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDXZcyEZT_CD6BrhwFcjxe0ya97HR1xtOc",
  authDomain: "instagram-cbf81.firebaseapp.com",
  projectId: "instagram-cbf81",
  storageBucket: "instagram-cbf81.appspot.com",
  messagingSenderId: "142606037499",
  appId: "1:142606037499:web:3e335c48c8e5a583371b5e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
