// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAHYTqnEes_Hpkw2uNdWitGcww6GYGzGhk",
  authDomain: "airbnb-marketplace.firebaseapp.com",
  projectId: "airbnb-marketplace",
  storageBucket: "airbnb-marketplace.appspot.com",
  messagingSenderId: "320744830670",
  appId: "1:320744830670:web:3b86b3c8b28688703a029f",
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
