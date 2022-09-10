// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAZtz1yaafkZDsIHk4PPQwga3-wt1qXkLg",
  authDomain: "instagram-cde61.firebaseapp.com",
  projectId: "instagram-cde61",
  storageBucket: "instagram-cde61.appspot.com",
  messagingSenderId: "34543076726",
  appId: "1:34543076726:web:cf0a419c14002a3ca86657"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
