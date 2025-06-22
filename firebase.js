import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDyxwrDzsMmeYQAWvv-HlvmgD-ypceHBaw",
  authDomain: "techsastaearnings.firebaseapp.com",
  projectId: "techsastaearnings",
  storageBucket: "techsastaearnings.firebasestorage.app",
  messagingSenderId: "822746081195",
  appId: "1:822746081195:web:fa2ea2d25e46bbbc6454ee",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);