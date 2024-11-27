import HidHeader from "components/Landing/minors/headers/hidHeader";
import GroupHeaders from "components/groupHeadings/groupHeaders";
import React, { useState, useEffect } from "react";
import empty from "../../assets/images/emptycarts.png";
import MobileCheckout from "components/mobilenav/mobileCheckout";
import { useSelector, useDispatch } from "react-redux";
import CartCardsPay from "../User/cart/cart-card-pay";
import { useNavigate } from "react-router-dom";
import { getExistingDoc } from "firebasedatas/firebaseAuth";
import { HandlePayment } from "paystack/paystackInterface";
import { toast } from "react-hot-toast";
import timeFormat from "Utils/timeFormat";
import { saveHistory } from "firebasedatas/transactionHistory";
import PaymentNotification from "components/paymentnotification/paymentNote";
const InitiatePay = () => {
  const [isShow, setisShow] = useState(false);
  const { currentUser, payStatus } = useSelector((state) => state.user);
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const { cartItems, overallPrice } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const [isNote, setisNote] = useState();
  const [transHistory, setTransHistory] = useState();
  const dispatch = useDispatch();
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
    HandlePayment(email, parseFloat(overallPrice), dispatch);
  };

  // useEffect(() => {
  //   const history = async () => {
  //     if (payStatus) {
  //       setTransHistory(cartItems);

  //       await saveHistory({
  //         status: payStatus,
  //         type: "checkout",
  //         cart: cartItems,
  //         userId: currentUser,
  //         date: `${day} ${month} ${year}`,
  //         time: `${timeFormat(hours, minutes, seconds, amPm)}`,
  //         createdAt: dt.getTime(),
  //       })
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
  return (
    <div className="w-full min-h-screen bg-[#0b8e8e] flex flex-col gap-3">
      <div className="w-28 h-28 rounded-full bg-white flex items-center justify-center my-10 mx-auto">
        <img src="/waveb.png" alt="wavebudget-logo" className="w-10 h-10" />
      </div>
      <h1 className="text-white font-bold text-center text-4xl mb-8">Payment Gateway</h1>
      <div className="h-full relative mb-[1rem] w-full p-2 gap-6 flex flex-col">
        {cartItems.length === 0 && (
          <div className=" m-auto absolute w-[320px] inset-0 flex flex-col justify-center items-center space-y-[4%] h-fit">
            <div className="w-[128px] h-[128px]">
              <img className="w-full h-full" src={empty} alt="" />
            </div>
            <div>No item in the cart</div>
            <button
              onClick={() => {
                navigate("/");
              }}
              className="text-white sm:w-[50%] bg-sky-900 border py-2 space-x-2   rounded-lg flex justify-center items-center w-[50%]">
              Start Shopping
            </button>
          </div>
        )}
        <div className="grid grid-cols-2 gap-2">
          {cartItems.length !== 0 && (
            <div>
              <div className="flex flex-col justify-start space-y-[5%] text-zinc-800 bg-white p-2 rounded-lg">
                {/* <h1 className="text-2xl font-bold text-[#0b8e8e]">Bank Details</h1>
          <p className='font-bold text-[#0B8E8E] my-4'>Notice: <span className='font-normal'>To complete order make a transfer to the account below.</span></p>
          <p className='font-bold text-[#0B8E8E] my-4'>Account Name: <span className='font-normal'>Wavebudget-FinTech</span></p>
          <p className='font-bold text-[#0B8E8E] my-4'>Account Number: <span className='font-normal'>1234567890</span></p>
          <p className='font-bold text-[#0B8E8E] my-4'>Bank Name: <span className='font-normal'>Wavebudget Bank</span></p> */}
                <div className="order-last max-[650px]:hidden space-y-5 xl:right-[50px] right-[30px] top-[200px] w-[250px] xl:w-[300px] h-fit rounded-md bg-white p-3 flex flex-col justify-center items-center">
                  <div className="text-[16px] w-full font-semibold flex items-center justify-between">
                    <span className="">Total:</span>
                    <span>{`₦${overallPrice}`}</span>
                  </div>

                  <button onClick={handlePay} className="text-white py-2 bg-[#009999] rounded-2xl flex justify-center items-center w-full">
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          )}
          <div className="mt-[40px] min-[450px]:mt-0 flex flex-col pb-20 mx-auto min-[650px]:mx-0 w-[90%] min-[650px]:w-[60%] min-[930px]:w-[70%] space-y-[3%] justify-start items-center">
            {cartItems?.map(({ name, curPrice, image, count }, idx) => {
              return (
                <div key={idx} className="w-full h-full">
                  <CartCardsPay name={name} price={curPrice} quantity={count} id={idx} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InitiatePay;
