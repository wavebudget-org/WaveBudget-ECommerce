/* eslint-disable */
import { auth, db, storage } from "./firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { collection, query, where, addDoc, getDocs, setDoc, getDoc, doc, getFirestore, deleteDoc } from "firebase/firestore";

// login in user only
export const userlogin = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

/// query user data
export const getUserData = async (sellersId, customersId) => {
  const queryCustomer = query(collection(db, "userinformation"), where("type", "==", "Customer"));

  await getDocs(queryCustomer).then((res) => {
    res.docs.forEach((doc) => {
      const { fields } = doc._document.data.value.mapValue;
      console.log(fields);
      customersId.push(fields.userId.stringValue);
    });
  });

  const queryMerchant = query(collection(db, "userinformation"), where("type", "==", "Merchant"));

  //console.log("from env file", process.env.VUE_APP_MESSAGING_ID)
  await getDocs(queryMerchant).then((res) => {
    res.docs.forEach((doc) => {
      const { fields } = doc._document.data.value.mapValue;
      sellersId.push(fields.userId.stringValue);
    });
  });

  return {
    customersId,
    sellersId,
  };
};

// register user
export const userRegistration = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

//\ register merchant
export const merchantRegistration = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

///get existing doc
export const getExistingDoc = async (id) => {
  const docRef = doc(db, "userinformation", id);
  let result;
  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      result = docSnap.data();
    } else {
      console.log("Document does not exist");
    }
  } catch (error) {
    console.log(error);
  }

  return result;
};
