import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import timeFormat from "Utils/timeFormat";
import { getExistingDoc } from "firebasedatas/firebaseAuth";
import PaymentNotification from "components/paymentnotification/paymentNote";
import { saveHistory } from "firebasedatas/transactionHistory";
import { formatter } from "Utils/helpers";
import { PaystackButton } from "react-paystack";
import { sendToStore } from "firebasedatas/addProduct";
const PaymentGateway = () => {
  const { cartItems, overallPrice } = useSelector((state) => state.cart);
  const [email, setEmail] = useState();
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [transHistory, setTransHistory] = useState();
  const [isNote, setisNote] = useState(false);
  const [status, setStatus] = useState("");
  const dt = new Date();
  const month = dt.toLocaleString("default", { month: "long" });
  const day = dt.getDate();
  const year = dt.getFullYear();
  let hours, minutes, seconds, amPm;
  //console.log(name, description, price.)
  useEffect(() => {
    if (!currentUser) return;
    async function getUser() {
      await getExistingDoc(currentUser)
        .then((res) => {
          setEmail(res.email);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    getUser();
  }, [currentUser]);

  const handleShareReciept = () => {
    const url = "https://wa.me/2348137960202?text=";
    window.open(url, "blank").focus();
  };

  const publicKey = "pk_test_7fb90bd8aa7b5f58930828f02a247d2a950ad4d2";

  const componentProps = {
    email,

    amount: overallPrice * 100,

    publicKey,

    text: "Pay with Paystack",

    onSuccess: async () => {
      // if (payStatus) {
      setTransHistory(cartItems);
      const details = JSON.parse(localStorage.getItem("details"));

      await saveHistory({
        paymentStatus: "Success",
        status: "Processing",
        type: "checkout",
        cart: cartItems,
        userId: currentUser,
        date: `${day} ${month} ${year}`,
        time: `${timeFormat(hours, minutes, seconds, amPm)}`,
        createdAt: dt.getTime(),
        customerName: details.customerName,
        customerEmail: details.customerEmail,
        customerAddress: details.customerAddress,
        customerPhone: details.customerPhone,
        customerCity: details.customerCity,
        customerState: details.customerState,
        customerLga: details.customerLga,
      })
        .then((res) => {
          cartItems?.map(async (item) => {
            const payload = {
              name: item.name,
              description: item.description,
              storeName: item.storeName,
              merchantId: item.merchantId,
              qty: Number(item.qty) - item.count,
              image: item.images,
              category: item.category,
              sellerPrice: item.price,
              price: item.curPrice,
              id: item.productId,
            };
            await sendToStore(payload)
              .then((res) => {
                setStatus("Success");
                setisNote(true);
                navigate("/");
              })
              .catch((err) => {
                console.log(err);
              });
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    onCancel: (response) => {
      setStatus("Failed");
    },
  };

  return (
    <div className="w-full min-h-screen bg-[#0b8e8e] flex flex-col items-center justify-center ">
      <div className="w-28 h-28 rounded-full bg-white flex items-center justify-center my-10">
        <img src="/waveb.png" alt="wavebudget-logo" className="w-10 h-10" />
      </div>
      <h1 className="text-white font-bold text-center text-4xl mb-8">Payment Gateway</h1>
      <div className="mb-[1rem] w-full max-w-[850px] bg-white px-2 py-16 gap-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <div className="w-full min-[450px]:mt-0 mt-[35px] mx-auto">
          <div className="w-[93%] mx-auto flex flex-col cursor-pointer sm:row-span-2">
            <div className="w-full rounded-sm">
              <div className="bg-white overflow-hidden">
                <img src="/transfer.png" alt="transfer-logo" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-start space-y-[5%] text-zinc-800">
          <h1 className="text-2xl font-bold text-[#0b8e8e]">Product Details</h1>
          <div className="capitalize border-b p-2 w-full grid grid-cols-2 gap-[3.5rem] items-center">
            <span> Products:</span>
            <span>
              <b>{cartItems?.length}</b>
            </span>
          </div>

          <div className="capitalize border-b p-2 w-full grid grid-cols-2 gap-[3.5rem] items-center">
            <span>Price:</span>
            <span>
              <b>{formatter.format(overallPrice) || formatter.format(0)}</b>
            </span>
          </div>
          <button onClick={handleShareReciept} className="text-white py-2 bg-[#009999] rounded-2xl flex justify-center items-center w-full">
            Share payment receipt
          </button>
          <PaystackButton type="submit" {...componentProps} className="text-white py-2 bg-[#009999] rounded-2xl hidden justify-center items-center w-full" />
        </div>
        <div className="flex flex-col justify-start space-y-[5%] text-zinc-800">
          <h1 className="text-2xl font-bold text-[#0b8e8e]">Bank Details</h1>
          <p className="font-bold text-[#0B8E8E] my-4">
            Notice: <span className="font-normal">To complete order make a transfer to the account below.</span>
          </p>
          <p className="font-bold text-[#0B8E8E] my-4">
            Account Name: <span className="font-normal">WaveBudget Technology Limited</span>
          </p>
          <p className="font-bold text-[#0B8E8E] my-4">
            Account Number: <span className="font-normal">5364488676</span>
          </p>
          <p className="font-bold text-[#0B8E8E] my-4">
            Bank Name: <span className="font-normal">Moniepoint</span>
          </p>
        </div>
      </div>
      <PaymentNotification isNote={isNote} setisNote={setisNote} transHistory={transHistory} payStatus={status} setStatus={setStatus} />
    </div>
  );
};

export default PaymentGateway;
