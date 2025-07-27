// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, FacebookAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC2PEE7v2rIERcgsC1VFqCOd-xhpoVf_eo",
  authDomain: "finalproject-6d45e.firebaseapp.com",
  projectId: "finalproject-6d45e",
  storageBucket: "finalproject-6d45e.firebasestorage.app",
  messagingSenderId: "143270999102",
  appId: "1:143270999102:web:f30c2af0e371f1dd688d6f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//we set export so we can use it in other files
export const auth = getAuth(app);
export const facebookProvider = new FacebookAuthProvider();
export const db = getFirestore(app);