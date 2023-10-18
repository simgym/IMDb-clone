// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDFuli47qnOX9eCswS7kcWarSlSX30PqPI",
  authDomain: "imdbclone-cbec9.firebaseapp.com",
  projectId: "imdbclone-cbec9",
  storageBucket: "imdbclone-cbec9.appspot.com",
  messagingSenderId: "683060307677",
  appId: "1:683060307677:web:7ac33856704edd05389d34",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// for using authentication
export const auth = getAuth(app);
// for accessind database
export const db = getDatabase(app);
