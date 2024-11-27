/* eslint-disable */
import { auth, db, storage } from "./firebase";
import { collection, query, where, addDoc, getDocs, setDoc, getDoc, doc, getFirestore, deleteDoc } from "firebase/firestore";

/// query user data
export const getPurchased = async (singleItem, multipleItems) => {
  const queryP = query(collection(db, "transactionHistory"), where("type", "==", "no-checkout"));

  await getDocs(queryP).then((res) => {
    res.docs.forEach((doc) => {
      const { fields } = doc._document.data.value.mapValue;
      singleItem.push(fields);
    });
  });

  const queryM = query(collection(db, "transactionHistory"), where("type", "==", "checkout"));

  await getDocs(queryM).then((res) => {
    res.docs.forEach((doc) => {
      const { fields } = doc._document.data.value.mapValue;
      const { cart, userId, createdAt, date, time, status } = fields;
      const { values } = cart.arrayValue;
      values.forEach(({ mapValue }, index) => {
        const { fields } = mapValue;
        multipleItems.push({
          createdAt,
          date,
          time,
          status,
          userId,
          ...fields,
        });
      });
    });
  });

  return { singleItem, multipleItems };
};
export const getOrders = async () => {
  const queryM = query(collection(db, "transactionHistory"), where("type", "==", "checkout"));

  let data = [];
  await getDocs(queryM).then((res) => {
    res.docs.forEach((doc) => {
      const { fields } = doc._document.data.value.mapValue;
      const { cart, userId, createdAt, date, time, status, customerName } = fields;
      const { values } = cart.arrayValue;
      let cartData = [];
      values.forEach(({ mapValue }, index) => {
        const { fields } = mapValue;
        cartData.push({
          category: fields.category.stringValue,
          count: fields.count.integerValue,
          curPrice: fields.curPrice.integerValue,
          id: fields.merchantId.stringValue,
          name: fields.name.stringValue,
        });
      });
      data.push({
        id: doc.id,
        cart: cartData,
        userId: userId.stringValue,
        createdAt: createdAt.integerValue,
        date: date.stringValue,
        time: time.stringValue,
        status: status.stringValue,
        customerName: customerName.stringValue,
      });
    });
  });

  return data;
};

export const updateOrders = async (id, payload) => {
  let success;
  const docRef = doc(db, "transactionHistory", id);

  await setDoc(docRef, payload, { merge: true })
    .then((docRef) => {
      console.log("Entire Document has been updated successfully");
      success = docRef;
    })
    .catch((error) => {
      console.log(error);
    });

  return success;
};
