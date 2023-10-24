/* eslint-disable */
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


  /// query user data
export const getCustomers = async (customers) => {
  const queryCustomer = query(
    collection(db, "userinformation"),
    where("type", "==", "Customer")
  );


  await getDocs(queryCustomer).then((res) => {
    console.log(res.docs);
    res.docs.forEach((doc) => {
      const { fields } = doc._document.data.value.mapValue;
      console.log(fields)
      customers.push(fields)
   
    });
  });

  

  return customers
  
}

export const getMerchant = async(sellers) => {
    const queryMerchant = query(
        collection(db, "userinformation"),
        where("type", "==", "Merchant")
      );
    
      //console.log("from env file", process.env.VUE_APP_MESSAGING_ID)
      await getDocs(queryMerchant).then((res) => {
        console.log(res.docs);
        res.docs.forEach((doc) => {
          const { fields } = doc._document.data.value.mapValue;
          console.log(fields)
          sellers.push(fields)
       
        });
      });

      return sellers
}

  


///get existing doc
export const getExistingDoc = async (id) => {
  const docRef = doc(db,  "userinformation", id);
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

