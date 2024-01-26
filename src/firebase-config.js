// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration

const firebaseConfig = {
    apiKey: "AIzaSyAIu1xFY_GIktYdCgree3dO8UT9WeJteyo",
  authDomain: "chat-d824b.firebaseapp.com",
  projectId: "chat-d824b",
  storageBucket: "chat-d824b.appspot.com",
  messagingSenderId: "1047593046506",
  appId: "1:1047593046506:web:0fa7ad0971b72b4046a293",
  measurementId: "G-6Y8G4XH8CP"
};
 
// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const storage = getStorage();

export const db = getFirestore(app);
//export default app;