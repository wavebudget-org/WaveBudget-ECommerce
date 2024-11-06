import HidHeader from "components/Landing/minors/headers/hidHeader";
import GroupHeaders from "components/groupHeadings/groupHeaders";
import React, { useState, useEffect } from "react";
import empty from "../../../assets/images/emptycarts.png";
import MobileCheckout from "components/mobilenav/mobileCheckout";
import { useSelector } from "react-redux";
import CartCards from "./cartCard";
import { useNavigate } from "react-router-dom";
import { getExistingDoc } from "firebasedatas/firebaseAuth";
import { toast } from "react-hot-toast";
import timeFormat from "Utils/timeFormat";
import { saveHistory } from "firebasedatas/transactionHistory";
import PaymentNotification from "components/paymentnotification/paymentNote";
import { formatter } from "Utils/helpers";
const UserCart = () => {
  const isShow = false;
  const { currentUser, payStatus } = useSelector((state) => state.user);
  const [email, setEmail] = useState();
  const { cartItems, overallPrice } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const [isNote, setisNote] = useState();
  const [transHistory, setTransHistory] = useState();
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

  const handlePay = () => {
    if (!currentUser) {
      toast.error("You must be logged in to buy");
      return;
    }
    // HandlePayment(email, parseFloat(overallPrice), dispatch);
    navigate("/cart/initiate-payment");
  };

  useEffect(() => {
    const history = async () => {
      if (payStatus) {
        setTransHistory(cartItems);

        await saveHistory({
          status: payStatus,
          type: "checkout",
          cart: cartItems,
          userId: currentUser,
          date: `${day} ${month} ${year}`,
          time: `${timeFormat(hours, minutes, seconds, amPm)}`,
          createdAt: dt.getTime(),
        })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });

        setisNote(true);
      }
    };

    history();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payStatus]);
  return (
    <div className="w-full h-full">
      <HidHeader isVisibles={!isShow} />
      <GroupHeaders headings={"Shopping Cart"} />

      <div className="mt-[56px]  h-full relative min-[450px]:mt-[60px] sm:mt-[80px] mb-[1rem] w-full p-2 min-[450px]:p-3 gap-6 flex flex-col">
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
        {cartItems.length !== 0 && (
          <div className="max-[650px]:hidden space-y-5 xl:right-[50px] right-[30px] top-[200px] fixed w-[250px] xl:w-[300px] h-fit rounded-md bg-white p-3 flex flex-col justify-center items-center">
            <div className="text-[16px] w-full font-semibold flex items-center justify-between">
              <span className="">Total:</span>
              <span>{formatter.format(overallPrice)}</span>
            </div>

            <button onClick={handlePay} className="text-white py-2 bg-[#009999] rounded-2xl flex justify-center items-center w-full">
              Checkout
            </button>
          </div>
        )}
        <div className="mt-[40px] min-[450px]:mt-0 flex flex-col pb-20 mx-auto min-[650px]:mx-0 w-[90%] min-[650px]:w-[60%] min-[930px]:w-[70%] space-y-[3%] justify-start items-center">
          {cartItems?.map(({ name, curPrice, image, count }, idx) => {
            return (
              <div key={idx} className="w-full h-full">
                <CartCards name={name} image={image} price={curPrice} quantity={count} id={idx} />
              </div>
            );
          })}
        </div>
      </div>

      <PaymentNotification isNote={isNote} setisNote={setisNote} transHistory={transHistory} />
      <MobileCheckout total={overallPrice} email={email} />
    </div>
  );
};

export default UserCart;
