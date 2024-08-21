// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC02C7tvVcNeD7GYp96N_ch2gOKyf5m0zk",
  authDomain: "rivayatt-3c9d5.firebaseapp.com",
  databaseURL: "https://rivayatt-3c9d5-default-rtdb.firebaseio.com",
  projectId: "rivayatt-3c9d5",
  storageBucket: "rivayatt-3c9d5.appspot.com",
  messagingSenderId: "388198132757",
  appId: "1:388198132757:web:3f9196b19ec29eabcf721c",
  measurementId: "G-WZTTSHK9RF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Firestore and get a reference to the service
const db = getFirestore(app);

// Initialize Storage and get a reference to the service
const storage = getStorage(app);

export { auth, db, storage };
