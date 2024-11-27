import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getExistingDoc } from "firebasedatas/firebaseAuth";
import { toast } from "react-hot-toast";
import { HandlePayment } from "paystack/paystackInterface";
import { saveHistory } from "firebasedatas/transactionHistory";
import timeFormat from "Utils/timeFormat";
const MobileBtns = ({ name, curPrice, image, bnpl, plink, count, store }) => {
  const { currentUser, payStatus } = useSelector((state) => state.user);
  const [username, setUsername] = useState();
  const dispatch = useDispatch();
  const [isNote, setisNote] = useState();
  const [transHistory, setTransHistory] = useState();
  //const { pathname } = useLocation();
  const [email, setEmail] = useState();
  const dt = new Date();
  const month = dt.toLocaleString("default", { month: "long" });
  const day = dt.getDate();
  const year = dt.getFullYear();
  let hours, minutes, seconds, amPm;

  useEffect(() => {
    if (!currentUser) return;
    async function getUser() {
      await getExistingDoc(currentUser)
        .then((res) => {
          console.log(res);
          setUsername(res.name);
          setEmail(res.email);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    getUser();
  }, []);

  const handlePay = () => {
    if (!currentUser) {
      toast.error("You must be logged in to buy");
      return;
    }
    HandlePayment(email, parseFloat(curPrice), dispatch);
  };

  // useEffect(() => {
  //   const history = async () => {
  //     if (payStatus) {
  //       setTransHistory([
  //         {
  //           name,

  //           price: curPrice,
  //           count,
  //           storeName: store,
  //         },
  //       ]);

  //       const payload = {
  //         userId:currentUser,
  //         status: payStatus,
  //         name,
  //         curPrice: parseInt(curPrice),
  //         count,
  //         storeName: store,
  //         type: 'no-checkout',
  //         date: `${day} ${month} ${year}`,
  //         time: `${timeFormat(hours, minutes, seconds, amPm)}`,
  //         createdAt: dt.getTime(),
  //       };

  //       await saveHistory(payload)
  //         .then((res) => {
  //           console.log(res);
  //         })
  //         .catch((err) => {
  //           console.log(err);
  //         });

  //       setisNote(true);
  //     }
  //   };

  //   history();
  // }, [payStatus]);

  const handleInstallment = () => {
    if (!currentUser) {
      toast.error("You must be logged in to buy");
      return;
    }
    const url =
      "https://wa.me/2348137960202?text=" +
      "Username: " +
      username +
      "%0a" +
      "Email:   " +
      email +
      "%0a" +
      "Product Name:   " +
      name +
      "%0a" +
      "Quantity:   " +
      count +
      "%0a" +
      "Price:   " +
      bnpl +
      "%0a" +
      "Store:   " +
      store +
      "%0a" +
      "Product link:  " +
      plink +
      "%0a";

    window.open(url, "blank").focus();
  };
  return (
    <div className="min-[450px]:hidden fixed w-full border-t shadow-lg bg-white inset-x-0 flex gap-3 justify-between p-4 rounded-t-xl bottom-0">
      <button onClick={handlePay} className="text-white bg-[#009999] flex rounded-2xl py-3 justify-center items-center w-[90%]">
        Buy now
      </button>
      <button onClick={handleInstallment} className="text-white py-3 bg-sky-900 rounded-2xl flex justify-center items-center w-[90%]">
        Buy on installment
      </button>
    </div>
  );
};

export default MobileBtns;
