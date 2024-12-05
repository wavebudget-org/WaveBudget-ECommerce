import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "./firebase";

/// getting docs

export const getAll = async (data) => {
  const queryData = query(collection(db, "productDetails"));

  //console.log("from env file", process.env.VUE_APP_MESSAGING_ID)
  await getDocs(queryData).then((res) => {
    res.docs.forEach((doc) => {
      //console.log(doc._document.data.value.mapValue)
      const { fields } = doc._document.data.value.mapValue;
      const { category, description, createdAt, name, price, qty, image, storeName, merchantId } = fields;

      data.push({
        id: doc.id,
        category: category.stringValue,
        description: description.stringValue,
        createdAt: createdAt.integerValue,
        name: name.stringValue,
        price: price.integerValue === undefined ? price.stringValue : price.integerValue,
        qty: qty.integerValue === undefined ? qty.stringValue : qty.integerValue,
        image: image.arrayValue,
        storeName: storeName.stringValue,
        merchantId: merchantId.stringValue,
      });
    });
  });

  return data;
};

export const getCategory = async (cats) => {
  const queryDoc = query(collection(db, "productDetails"), where("category", "==", cats));
  let data = [];
  //console.log("from env file", process.env.VUE_APP_MESSAGING_ID)
  await getDocs(queryDoc).then((res) => {
    if (res.docs.length === 0) data = [];
    else {
      res.docs.forEach((doc) => {
        const { fields } = doc._document.data.value.mapValue;
        const { category, description, createdAt, name, price, image, qty, storeName, merchantId } = fields;
        data.push({
          id: doc.id,
          category: category.stringValue,
          description: description.stringValue,
          createdAt: createdAt.integerValue,
          name: name.stringValue,
          price: price.integerValue === undefined ? price.stringValue : price.integerValue,
          qty: qty.integerValue === undefined ? qty.stringValue : qty.integerValuee,
          image: image.arrayValue,
          storeName: storeName.stringValue,
          merchantId: merchantId.stringValue,
        });
      });
    }
  });
  return data;
};
