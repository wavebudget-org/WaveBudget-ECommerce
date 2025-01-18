import { db } from "./firebase";
// import { v4 } from "uuid";
import { setDoc, doc } from "firebase/firestore";
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const saveData = async (id, payload) => {
  const userRef = doc(db, "userinformation", id);

  return setDoc(userRef, payload);
};

export const saveMerchantID = async (id, payload) => {
  const ref = doc(db, "storeOwners", id);

  return setDoc(ref, payload);
};
