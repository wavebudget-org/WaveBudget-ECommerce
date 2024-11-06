import { db, storage } from "./firebase";
import { v4 } from "uuid";
import { setDoc, doc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const saveData = async (id, payload) => {
  const userRef = doc(db, "userinformation", id);

  if (payload.cacImage) {
    let result;
    const imgRef = ref(storage, `images/${payload.cacImage + v4()}`);

    await uploadBytes(imgRef, payload.cacImage)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    await getDownloadURL(imgRef)
      .then((res) => {
        console.log(res);
        result = res;
      })
      .catch((err) => {
        console.log(err);
      });

    return setDoc(userRef, {
      email: payload.email,
      userId: id,
      phoneNumber: payload.phoneNumber,
      acctname: payload.acctname,
      acctnumber: payload.acctnumber,
      bankname: payload.bankname,
      store: payload.store,
      address: payload.address,
      businessType: payload.businessType,
      cac: result,
      businessDescription: payload.businessDescription,
      type: "Merchant",
    });
  } else {
    return setDoc(userRef, payload);
  }
};

export const saveMerchantID = async (id, payload) => {
  const ref = doc(db, "storeOwners", id);

  return setDoc(ref, payload);
};
