/* eslint-disable */
import { auth, db, storage } from "./firebase";
import { v4 } from "uuid";
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



///delete item
export const deleteProduct = async (id) => {
    let result;
  
    await deleteDoc(doc(db, "productDetails", id))
      .then((res) => {
        console.log(res);
  
        result = res;
      })
      .catch((er) => {
        console.log(er);
      });
  
    return result;
  };