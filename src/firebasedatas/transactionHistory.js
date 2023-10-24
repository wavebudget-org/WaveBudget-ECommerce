import { auth, db, storage } from "./firebase";
import {
  collection,
  query,
  where,
  addDoc,
  getDocs,
  setDoc,
  getDoc,
  doc,
  getFirestore,
  deleteDoc,
} from "firebase/firestore";



export const saveHistory = async (payload) => {
    console.log(payload)
   
    const ref = collection(db, "transactionHistory");
    //let result;
    return await addDoc(ref, payload)
      .then((res) => {
        console.log(res);
      
      })
      .catch((err) => {
        console.log(err);
      });

  };
  