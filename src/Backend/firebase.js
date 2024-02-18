import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyCSUJcNxvyu6FZEAn-z9B_8BjXDdvndGt4",
  authDomain: "g-mail-clone-effc3.firebaseapp.com",
  projectId: "g-mail-clone-effc3",
  storageBucket: "g-mail-clone-effc3.appspot.com",
  messagingSenderId: "124391567877",
  appId: "1:124391567877:web:9420935cd99954dc13626c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

const auth = getAuth()

export { db, auth }