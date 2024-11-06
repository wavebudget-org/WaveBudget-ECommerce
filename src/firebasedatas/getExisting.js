import { db } from "./firebase";
import { getDoc, doc } from "firebase/firestore";

///get existing doc
export const getExistingProduct = async (id) => {
  const docRef = doc(db, "productDetails", id);
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
