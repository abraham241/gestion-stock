// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAq3x4_fBmTyQ5-2hVR00vwLeqPVIVW2Ng",
  authDomain: "gestion-stock-97396.firebaseapp.com",
  projectId: "gestion-stock-97396",
  storageBucket: "gestion-stock-97396.appspot.com",
  messagingSenderId: "251487422324",
  appId: "1:251487422324:web:4c2267a5af6aa9ba494e21"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const   Auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);

export {
    Auth,
    db,
    storage
}