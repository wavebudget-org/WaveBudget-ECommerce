/* eslint-disable */
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC-HmmsBDWYLSvYZJx0mdyCpzE5McKTbNQ",
  authDomain: "wavebudget-38d43.firebaseapp.com",
  projectId: "wavebudget-38d43",
  storageBucket: "wavebudget-38d43.firebasestorage.app",
  messagingSenderId: "605460868886",
  appId: "1:605460868886:web:5a935322ff602a66522a37",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;

// apiKey: "AIzaSyDp4LNrUobi8hpGOKdWnHRgKFxKZst7Tek",
// authDomain: "wavebudget-5050.firebaseapp.com",
// projectId: "wavebudget-5050",
// storageBucket: "wavebudget-5050.appspot.com",
// messagingSenderId: "984848210246",
// appId: "1:984848210246:web:cab082d45bef867f07ad47",
// measurementId: "G-P9ZY56ZMNN"
