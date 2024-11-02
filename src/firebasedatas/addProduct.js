import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { db, storage } from "./firebase";

export const sendToStore = async (data) => {
  const { image } = data;
  const { first, second, third, forth } = image;
  console.log("this is the image data", image);
  //console.log('this is',data.editted)
  let success;
  const result = {};

  if (data) {
    console.log(data);
  }

  if (first.isEdit) {
    const imgRef = ref(storage, `images/${first.img + v4()}`);

    await uploadBytes(imgRef, first.img)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    await getDownloadURL(imgRef)
      .then((res) => {
        console.log(res);
        result["first"] = res;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  if (second.isEdit) {
    const imgRefS = ref(storage, `images/${second.img + v4()}`);

    await uploadBytes(imgRefS, second.img)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    await getDownloadURL(imgRefS)
      .then((res) => {
        console.log(res);
        result["second"] = res;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  if (third.isEdit) {
    const imgRefT = ref(storage, `images/${third.img + v4()}`);

    await uploadBytes(imgRefT, third.img)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    await getDownloadURL(imgRefT)
      .then((res) => {
        console.log(res);
        result["third"] = res;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  if (forth.isEdit) {
    const imgRefF = ref(storage, `images/${forth.img + v4()}`);

    await uploadBytes(imgRefF, forth.img)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    await getDownloadURL(imgRefF)
      .then((res) => {
        console.log(res);
        result["forth"] = res;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  console.log(result);

  if (data.id) {
    console.log("from data id", data.id);
    const docRef = doc(db, "productDetails", data.id);
    const myImages = Object.values({
      first: first.isEdit ? result.first : first.img,
      second: second.isEdit ? result.second : second.img,
      third: third.isEdit ? result.third : third.img,
      forth: forth.isEdit ? result.forth : forth.img,
    });

    const filterImage = Object.values(myImages).filter((val) => val !== undefined);
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

    if (myImages) {
      console.log(myImages);
      console.log(payload);
    }

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

    const myImages = Object.values(result).filter((val) => val !== undefined);

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
