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
  try {
    const queryM = query(collection(db, "transactionHistory"), where("type", "==", "checkout"));
    const querySnapshot = await getDocs(queryM);

    // Map over Firestore documents efficiently
    const data = querySnapshot.docs.map((doc) => {
      const { fields } = doc._document.data.value.mapValue;
      console.log(fields);
      // Safely extract fields to prevent undefined errors
      const cartItems = fields?.cart?.arrayValue?.values || [];

      // Map over cart items
      const cartData = cartItems.map(({ mapValue }) => {
        const itemFields = mapValue?.fields || {};
        return {
          category: itemFields.category?.stringValue || "",
          count: itemFields.count?.integerValue || 0,
          curPrice: itemFields.curPrice?.integerValue || 0,
          id: itemFields.merchantId?.stringValue || "",
          name: itemFields.name?.stringValue || "",
        };
      });

      return {
        id: doc.id,
        cart: cartData,
        userId: fields?.userId?.stringValue || "",
        createdAt: fields?.createdAt?.integerValue || 0,
        date: fields?.date?.stringValue || "",
        time: fields?.time?.stringValue || "",
        status: fields?.status?.stringValue || "",
        customerName: fields?.customerName?.stringValue || "",
      };
    });

    return data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    return []; // Return an empty array in case of error
  }
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
