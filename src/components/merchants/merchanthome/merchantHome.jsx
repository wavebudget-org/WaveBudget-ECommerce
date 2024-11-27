import React, { useState, useEffect } from "react";
import TopNavBar from "../topnavbar";
import { getExistingDoc } from "firebasedatas/firebaseAuth";
import { useSelector } from "react-redux";
import DesktopDashNav from "../dashboard/desktopNav/desktopdashnav";
import MobileDashboard from "../dashboard/mobiledashnav";
import { formatter } from "Utils/helpers";
import { getOrders } from "firebasedatas/getPurchased";
// import { useForm } from "react-hook-form";
const MerchantHome = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [merchant, setMerchant] = useState();
  // const {
  //   handleSubmit,
  //   register,
  //   formState: { errors },
  //   reset,
  // } = useForm();

  const [amount, setAmount] = useState(0);

  useEffect(() => {
    async function getItems() {
      await getOrders()
        .then((res) => {
          let temp = res.map((items) => items.cart.filter((item) => item.id === merchant?.userId).map((value) => value.curPrice));
          let price = temp.flat().reduce((acc, item) => Number(acc) + Number(item), 0);
          setAmount(price);
        })
        .catch((er) => {
          console.log(er);
        });
    }
    getItems();
  }, [merchant?.userId]);

  const handlePayment = () => {
    // eslint-disable-next-line no-useless-concat
    const url = "https://wa.me/2348137960202?text=" + merchant.store + " would like to withdraw " + amount + " to their account";
    window.open(url, "blank").focus();
  };

  useEffect(() => {
    if (!currentUser) return;
    async function getUser() {
      await getExistingDoc(currentUser)
        .then((res) => {
          setMerchant(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    getUser();
  }, [currentUser]);

  return (
    <div className="w-full h-full">
      <TopNavBar merchant={merchant?.store} />
      <div className="let swipeIn mt-[10px] text-zinc-700 min-[450px]:mt-[30px] w-full sm:w-[95%] min-[1000px]:w-[80%] xl:w-[83%] pb-[5rem] sm:pb-[5rem] space-y-[5%] float-right p-6 text-">
        <div className="min-[450px]:h-[250px] h-[150px] overflow-hidden text-black bg-white-900  shadow-lg p-3 flex flex-col space-y-3 items-center justify-center max-[450px]:rounded-lg rounded-xl gap-4">
          <div className="text-5xl"> {formatter.format(amount)}</div>
          <div className="text-center">Wallet Balance</div>
          {/* <div className="flex w-[60%] gap-6 pt-30"> */}
          {/* <button className="bg-white-900 sm:w-full lg:w-[90%] border-[#009999] py-3  rounded-lg border flex justify-center items-center w-[90%]" onClick={() => setActive(true)}>
              Add Bank
            </button> */}
          <button onClick={handlePayment} className="text-white sm:w-full lg:w-[60%] bg-[#009999] flex rounded-lg py-3 justify-center items-center w-[90%]">
            Withdraw
          </button>
          {/* </div> */}
        </div>
      </div>
      <DesktopDashNav />
      <MobileDashboard />
      {/* <div
        onClick={() => setActive(false)}
        className={active ? " fixed text-zinc-700 z-[99] inset-0 h-full w-full bg-black bg-opacity-[0.5] flex items-center justify-center" : "hidden"}>
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="lets swipeDown overflow-hidden space-y-2 min-[450px]:space-y-3 max-[450px]:w-[90%] bg-white rounded-xl max-[450px]:rounded-lg p-4 w-[450px] m-auto absolute inset-x-0 h-[280px] flex flex-col justify-start items-center">
          <form onSubmit={handleSubmit(() => {})} className="orderChange">
            <h2>Add Bank</h2>
            <div className="form-group space-y-3 w-full">
              <label className="block font-semibold text-zinc-800" htmlFor="email">
                Email Address
              </label>
              <input
                className="block form__input input-field border border-black  rounded-md focus:outline-none w-full h-10 sm:h-11 px-4"
                type="email"
                placeholder=""
                name="email"
                {...register("email", { required: "Email Address is required" })}
              />
              {errors.email && <span className="font-small text-[#FF0000]">{errors.email.message}</span>}
            </div>
            {loading ? <h2>Loading...</h2> : <button type="submit">Add Bank</button>}
          </form>
        </div>
      </div> */}
    </div>
  );
};

export default MerchantHome;
