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

///get existing doc
export const getExistingProduct = async (id) => {
    const docRef = doc(db,  "productDetails", id);
    let result;
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log(docSnap.data());
  
        result = docSnap.data();
      } else {
        console.log("Document does not exist");
      }
    } catch (error) {
      console.log(error);
    }
  
    return result;
  };
  