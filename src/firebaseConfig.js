import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB0mArFqBOatI_-XPFnKIuMgjylfh9vLCw",
  authDomain: "ahenwada.firebaseapp.com",
  projectId: "ahenwada",
  storageBucket: "ahenwada.appspot.com",
  messagingSenderId: "809718584629",
  appId: "1:809718584629:web:0603916dd8c692a3b6287c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
