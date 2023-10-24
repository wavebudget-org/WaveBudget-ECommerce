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
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";


export const updateProfiles = async(id, payload) => {
    let success;
    const docRef = doc(db, "userinformation", id)

    await setDoc(docRef, payload, { merge: true })
    .then((docRef) => {
      console.log("Entire Document has been updated successfully");
      success = docRef;
    })
    .catch((error) => {
      console.log(error);
    });

    return success

}

export const getStores = async(stores) => {
    const queryMerchant = query(
        collection(db, "storeOwners")
      );
    
      //console.log("from env file", process.env.VUE_APP_MESSAGING_ID)
      await getDocs(queryMerchant).then((res) => {
        console.log(res.docs);
        res.docs.forEach((doc) => {
          const { fields } = doc._document.data.value.mapValue;
          console.log(fields)
          const {key, userId} = fields
         stores.push({key, userId})
       
        });
      });

      return stores
}


export const deleteProfile = async (id) => {
    let result;
  
    await deleteDoc(doc(db, "userinformation", id))
      .then((res) => {
        console.log(res);
  
        result = res;
      })
      .catch((er) => {
        console.log(er);
      });
  
    return result;
  };