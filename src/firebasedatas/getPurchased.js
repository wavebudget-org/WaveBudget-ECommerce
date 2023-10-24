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
export const getPurchased = async (singleItem, multipleItems) => {
  const queryP = query(
    collection(db, "transactionHistory"),
    where("type", "==", "no-checkout")
  );

  await getDocs(queryP).then((res) => {
    console.log(res.docs);
    res.docs.forEach((doc) => {
      const { fields } = doc._document.data.value.mapValue;
      console.log(fields);
      singleItem.push(fields);
    });
  });

  const queryM = query(
    collection(db, "transactionHistory"),
    where("type", "==", "checkout")
  );

  await getDocs(queryM).then((res) => {
    console.log(res.docs);
    res.docs.forEach((doc) => {
      const { fields } = doc._document.data.value.mapValue;
      console.log(fields);
      const { cart, userId,createdAt, date, time, status } = fields;
      const { values } = cart.arrayValue;
      values.forEach(({ mapValue }, index) => {
        const { fields } = mapValue;
        console.log("fields", fields);
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
