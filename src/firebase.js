// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, signOut, updateProfile, signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set, remove } from "firebase/database";
import { getStorage, ref as reference } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_EPICURE_APIKEY,
  authDomain: process.env.REACT_APP_EPICURE_AUTHDOMAIN,
  projectId: process.env.REACT_APP_EPICURE_PROJECTID,
  storageBucket: process.env.REACT_APP_EPICURE_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_EPICURE_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_EPICURE_APPID,
  measurementId: process.env.REACT_APP_EPICURE_MEASUREMENTID,
  databaseURL: process.env.REACT_APP_EPICURE_DATABASEURL
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);

// Get a reference to the authentication service
const auth = getAuth(app);

// Get a reference to the database service
const database = getDatabase(app);

// Get a reference to the storage service, which is used to create references in your storage bucket
const storage = getStorage();

export { auth, analytics, createUserWithEmailAndPassword, sendEmailVerification, signOut, database, ref, set, updateProfile, storage, reference, signInWithEmailAndPassword, remove };