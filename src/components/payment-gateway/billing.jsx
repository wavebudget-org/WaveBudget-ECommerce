import GroupHeaders from "components/groupHeadings/groupHeaders";
import HidHeader from "components/Landing/minors/headers/hidHeader";
import PaymentNotification from "components/paymentnotification/paymentNote";
import { sendToStore } from "firebasedatas/addProduct";
import { getExistingDoc } from "firebasedatas/firebaseAuth";
import { saveHistory } from "firebasedatas/transactionHistory";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { formatter, location } from "Utils/helpers";
import timeFormat from "Utils/timeFormat";
import Paystack from "@paystack/inline-js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Billing = () => {
  const navigate = useNavigate();
  const isVisible = true;
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm();
  const { currentUser } = useSelector((state) => state.user);
  const { cartItems, overallPrice } = useSelector((state) => state.cart);
  const [email, setEmail] = useState();
  const [username, setUsername] = useState();
  const [address, setAddress] = useState();
  const [state, setState] = useState();
  const [lga, setLga] = useState("");
  const [localGovernment, setLocalGovernment] = useState();
  const [city, setCity] = useState();
  const [phone, setPhone] = useState();
  const [isNote, setisNote] = useState();
  const [status, setStatus] = useState("");
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
          let names = res.name.split(" ");
          setValue("email", res.email);
          setValue("phone", res.phone);
          setPhone(res.phone);
          setValue("fname", names[0]);
          setValue("lname", names[1]);
          setEmail(res.email);
          setUsername(res.name);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    getUser();
  }, [currentUser, setValue]);

  //   const publicKey = "pk_test_e2f11bcc6e8ba94bb218a9b03bae850b9cb06092";
  const publicKey = "pk_test_7fb90bd8aa7b5f58930828f02a247d2a950ad4d2";

  useEffect(() => {
    location?.filter((item) => {
      if (item.state === state) {
        setLga(item.localGoverment);
      }
      return true;
    });
  }, [state]);

  const submit = () => {
    if (!currentUser) {
      toast.error("You must be logged in to buy");
      navigate("/signin");
      return;
    }
    const popup = new Paystack();
    popup.newTransaction({
      key: publicKey,
      email,
      amount: overallPrice * 100,
      onSuccess: async () => {
        // if (payStatus) {
        setTransHistory(cartItems);

        await saveHistory({
          paymentStatus: "Success",
          status: "Processing",
          type: "checkout",
          cart: cartItems,
          userId: currentUser,
          date: `${day} ${month} ${year}`,
          time: `${timeFormat(hours, minutes, seconds, amPm)}`,
          createdAt: dt.getTime(),
          customerName: username,
          customerEmail: email,
          customerAddress: address,
          customerPhone: phone,
          customerCity: city,
          customerState: state,
          customerLga: localGovernment,
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
                price: item.price,
                id: item.productId,
              };
              await sendToStore(payload)
                .then((res) => {})
                .catch((err) => {
                  console.log(err);
                });
            });
          })
          .catch((err) => {
            console.log(err);
          });
        setStatus("Success");
        setisNote(true);
      },
      onCancel: (response) => {
        setStatus("Failed");
      },
      onLoad: (response) => {
        console.log("onLoad: ", response);
      },
      onError: (error) => {
        console.log("Error: ", error.message);
      },
    });
  };

  // const componentProps = {
  //   email,

  //   amount: overallPrice * 100,

  //   publicKey,

  //   text: "Place Order",

  //   onSuccess: async () => {
  //     // if (payStatus) {
  //     setTransHistory(cartItems);

  //     await saveHistory({
  //       paymentStatus: "Success",
  //       status: "Processing",
  //       type: "checkout",
  //       cart: cartItems,
  //       userId: currentUser,
  //       date: `${day} ${month} ${year}`,
  //       time: `${timeFormat(hours, minutes, seconds, amPm)}`,
  //       createdAt: dt.getTime(),
  //       customerName: username,
  //       customerEmail: email,
  //       customerAddress: address,
  //       customerPhone: phone,
  //       customerCity: city,
  //       customerState: state,
  //     })
  //       .then((res) => {
  //         cartItems?.map(async (item) => {
  //           const payload = {
  //             name: item.name,
  //             description: item.description,
  //             storeName: item.storeName,
  //             merchantId: item.merchantId,
  //             qty: Number(item.qty) - item.count,
  //             image: item.images,
  //             category: item.category,
  //             price: item.price,
  //             id: item.productId,
  //           };
  //           await sendToStore(payload)
  //             .then((res) => {})
  //             .catch((err) => {
  //               console.log(err);
  //             });
  //         });
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //     setStatus("Success");
  //     setisNote(true);
  //   },
  //   onCancel: (response) => {
  //     setStatus("Failed");
  //   },
  // };
  return (
    <>
      <div className="w-full h-full mb-8">
        <HidHeader isVisibles={isVisible} />
        <GroupHeaders headings={"Billing Info"} />
        <form onSubmit={handleSubmit(submit)} className="mt-[56px]  h-full relative min-[450px]:mt-[60px] sm:mt-[80px] mb-[1rem] w-full p-2 min-[450px]:p-3 gap-6 flex flex-col">
          {cartItems.length !== 0 && (
            <div className="max-[650px]:hidden space-y-5 xl:right-[50px] right-[30px] top-[90px] fixed w-[250px] xl:w-[300px] h-fit rounded-md bg-white p-3 flex flex-col justify-center items-center">
              <div className="text-[16px] w-full font-semibold flex items-center justify-between">
                <span className="">Total:</span>
                <span>{formatter.format(overallPrice)}</span>
              </div>
              <button type="submit" className="text-white py-2 bg-[#009999] rounded-2xl flex justify-center items-center w-full">
                Place Order
              </button>
              {/* <PaystackButton type="submit" {...componentProps} className="text-white py-2 bg-[#009999] rounded-2xl flex justify-center items-center w-full" /> */}
            </div>
          )}
          <div className="mt-[40px] px-6 py-6 min-[450px]:mt-0 flex flex-col pb-20 mx-auto min-[650px]:mx-0 w-[90%] min-[650px]:w-[60%] min-[930px]:w-[70%] space-y-[3%] justify-start items-center bg-white rounded-md">
            <p className="text-zinc-800 font-semibold">Billing Details</p>
            <div className="form-group space-y-3 w-full">
              <label className="block font-semibold text-zinc-800" htmlFor="email">
                First Name
              </label>
              <input
                className="block form__input input-field border border-black  rounded-md focus:outline-none w-full  h-10 sm:h-11 px-4"
                type="text"
                disabled
                placeholder="Enter your First Name"
                name="fname"
                {...register("fname", { required: "First Name is required" })}
              />
              {errors.fname && <span className="font-small text-[#FF0000]">{errors.fname.message}</span>}
            </div>
            <div className="form-group space-y-3 w-full">
              <label className="block font-semibold text-zinc-800" htmlFor="email">
                Last Name
              </label>
              <input
                className="block form__input input-field border border-black  rounded-md focus:outline-none w-full  h-10 sm:h-11 px-4"
                type="text"
                disabled
                placeholder="Enter your Last Name"
                name="lname"
                {...register("lname", { required: "Last Name is required" })}
              />
              {errors.lname && <span className="font-small text-[#FF0000]">{errors.lname.message}</span>}
            </div>
            <div className="form-group space-y-3 w-full">
              <label className="block font-semibold text-zinc-800" htmlFor="email">
                State
              </label>
              <select
                className="block form__input input-field border border-black  rounded-md focus:outline-none w-full  h-10 sm:h-11 px-4"
                onInput={(e) => setState(e.target.value)}
                {...register("state", { required: "State is required" })}>
                <option value="">Choose a State</option>
                {location?.map((item, index) => {
                  return (
                    <option value={item.state} key={index}>
                      {item.state}
                    </option>
                  );
                })}
              </select>
              {errors.state && <span className="font-small text-[#FF0000]">{errors.state.message}</span>}
            </div>

            {lga && (
              <div className="form-group space-y-3 w-full">
                <label className="block font-semibold text-zinc-800" htmlFor="email">
                  Local Government Area
                </label>
                <select
                  className="block form__input input-field border border-black  rounded-md focus:outline-none w-full  h-10 sm:h-11 px-4"
                  onInput={(e) => setLocalGovernment(e.target.value)}
                  name="lga"
                  {...register("lga", { required: "Local Government Area is required" })}>
                  <option value="">Choose a Local Government Area</option>
                  {lga?.map((item, index) => {
                    return (
                      <option value={item.lgaName} key={index}>
                        {item.lgaName}
                      </option>
                    );
                  })}
                </select>
                {errors.lga && <span className="font-small text-[#FF0000]">{errors.lga.message}</span>}
              </div>
            )}
            <div className="form-group space-y-3 w-full">
              <label className="block font-semibold text-zinc-800" htmlFor="email">
                Town/City
              </label>
              <input
                className="block form__input input-field border border-black  rounded-md focus:outline-none w-full  h-10 sm:h-11 px-4"
                type="text"
                placeholder="Enter your Town/City"
                onInput={(e) => setCity(e.target.value)}
                name="town"
                {...register("town", { required: "Town is required" })}
              />
              {errors.town && <span className="font-small text-[#FF0000]">{errors.town.message}</span>}
            </div>
            <div className="form-group space-y-3 w-full">
              <label className="block font-semibold text-zinc-800" htmlFor="email">
                Street Address
              </label>
              <input
                className="block form__input input-field border border-black  rounded-md focus:outline-none w-full  h-10 sm:h-11 px-4"
                type="text"
                placeholder="Enter your Street address"
                onInput={(e) => setAddress(e.target.value)}
                name="address"
                {...register("address", { required: "Address is required" })}
              />
              {errors.address && <span className="font-small text-[#FF0000]">{errors.address.message}</span>}
            </div>

            <div className="form-group space-y-3 w-full">
              <label className="block font-semibold text-zinc-800" htmlFor="email">
                Phone
              </label>
              <input
                className="block form__input input-field border border-black  rounded-md focus:outline-none w-full  h-10 sm:h-11 px-4 cursor: not-allowed;"
                type="text"
                disabled
                placeholder="Enter your Phone"
                name="phone"
                {...register("phone", { required: "Phone is required" })}
              />
              {errors.phone && <span className="font-small text-[#FF0000]">{errors.phone.message}</span>}
            </div>
            <div className="form-group space-y-3 w-full">
              <label className="block font-semibold text-zinc-800" htmlFor="email">
                Email Address
              </label>
              <input
                className="block form__input input-field border border-black  rounded-md focus:outline-none w-full  h-10 sm:h-11 px-4"
                type="email"
                placeholder="Enter your email address"
                name="email"
                disabled
                {...register("email", { required: "Email Address is required" })}
              />
              {errors.email && <span className="font-small text-[#FF0000]">{errors.email.message}</span>}
            </div>
          </div>
          <PaymentNotification isNote={isNote} setisNote={setisNote} transHistory={transHistory} payStatus={status} setStatus={setStatus} />
          <>
            <div className="min-[650px]:hidden fixed w-full border-t shadow-lg items-center bg-white inset-x-0 flex gap-3 justify-between p-4 rounded-t-xl bottom-0">
              <div className="text-[16px]">
                <b>
                  <span className="mr-3 ">Total:</span>
                  <span>{formatter.format(overallPrice)}</span>
                </b>
              </div>

              <button type="submit" className="text-white py-3 bg-[#009999] rounded-2xl flex justify-center items-center w-[100px] ">
                Checkout
              </button>
            </div>
          </>
        </form>
      </div>
      {/* <WaveFooter /> */}
    </>
  );
};

export default Billing;
