import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { db } from "./firebase";

export const sendToStore = async (data) => {
  let success;
  if (data.id) {
    const docRef = doc(db, "productDetails", data.id);
    const myImages = data.image;

    const filterImage = myImages.filter((val) => val !== undefined);
    const payload = {
      name: data.name,
      description: data.description,
      category: data.category,
      storeName: data.storeName,
      merchantId: data.merchantId,
      qty: data.qty,
      image: filterImage,
      price: data.price,
      createdAt: new Date().getTime(),
    };

    setDoc(docRef, payload, { merge: true })
      .then((docRef) => {
        console.log("Entire Document has been updated successfully");
        success = docRef;
      })
      .catch((error) => {
        console.log(error);
      });

    return success;
  } else {
    // const imgArray = [first, second, third, forth];

    const productRef = collection(db, "productDetails");
    //let result;

    const myImages = data.image.filter((val) => val !== undefined);

    await addDoc(productRef, {
      name: data.name,
      description: data.description,
      category: data.category,
      qty: data.qty,
      storeName: data.storeName,
      merchantId: data.merchantId,
      image: myImages,
      price: data.price,
      createdAt: new Date().getTime(),
    })
      .then((res) => {
        console.log(res);
        success = res;
      })
      .catch((err) => {
        console.log(err);
      });

    return success;
  }
};
