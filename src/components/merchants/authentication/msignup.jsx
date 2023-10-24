import React, { useState } from "react";
import pay from "../../../assets/images/pay.png";
import viewpassword from "../../../assets/Svg/viewpassword.svg";
import logo from "../../../assets/images/waveb.png";
import { saveData, saveMerchantID } from "firebasedatas/storeRegdata";
import { merchantRegistration } from "firebasedatas/firebaseAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import Loader from "components/UI/Loader";
import { useDispatch } from "react-redux";
import { GetUsersSuccess } from "Redux/Actions/ActionCreators";
import { generateRandomID } from "Utils/helpers";
const MerchantSignUp = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [storeName, setStorename] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber]  = useState("");
  const [businessType, setBusinessType] = useState("");
  const [bizdescription, setBizdescription] = useState("");
  const [acctnumber, setAcctNumber] = useState("");
  const [bankname, setBankname] = useState("");
  const [acctname, setAccountName] = useState("");
  const [cac, setCAC] = useState();
  const [userId, setuserId] = useState();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const handleCAC = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 3000000) {
        toast.error("Image size should not exceeds 3MB");
        return;
      }

      setCAC(file);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    const validateData = {
      storeName,
      address,
      businessType,
      phoneNumber,
      acctname,
      acctnumber,
      bankname,
      email,
      password,
    };

    for (let i in validateData) {
      if (validateData[i] === "") {
        toast.error(`${i} is empty`);
        return;
      }
    }
    let form = {
      email: email,
      store: storeName,
      address,
      phoneNumber,
      acctname,
      acctnumber,
      bankname,
      businessType,
      cacImage: cac || "https://imagetolink.com/ib/cx6NeI8ZwH.png",
      businessDescription: bizdescription,
      type: "Merchant",
    };

    await merchantRegistration(email, password)
      .then(async (res) => {
        console.log(res);
        const { uid } = res.user;
        await saveData(res.user.uid, { userId: res.user.uid, ...form })
          .then(async (res) => {
            console.log(res);

            await saveMerchantID(uid, {
              userId: uid,
              key: generateRandomID(20),
              storeName,
            })
              .then((res) => {
                console.log(res);
                dispatch(GetUsersSuccess(uid));
                setLoading(false);
                toast.success("Registration successful");
                setStorename("");
                setEmail("");
                setPassword("");
                setBusinessType("");
                setBizdescription("");
                setAccountName("");
                setAcctNumber("");
                setBankname("");
                setPhoneNumber("")
                setCAC("");
                setAddress("");
                navigate("/seller/activate-account");
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => {
            console.log(err);
            setLoading(false);
            toast.error(err.code);
          });
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.code);
      });
  };

  return (
    <div className="w-full h-full fixed inset-0 ">
      <div className="w-full h-full">
        <div className=" bg-white py-3 px-6 min-[450px]:py-4 min-[450px]:px-4">
          <div
            onClick={() => {
              navigate(-1);
            }}
            className="flex space-x-2 items-center"
          >
            <div className="w-10 h-6">
              <img className="w-full h-full" src={logo} alt="" />
            </div>
            <div className="flex flex-col justify-start">
              <div className="uppercase font-medium text-[#009999]">Wave</div>
              <div className="uppercase font-medium text-[#009999]">Budget</div>
            </div>
          </div>
        </div>
        <div className="bg-gray-300 grid grid-cols-1 md:grid-cols-4  w-full h-full pt-[40px]">
          <div className="hidden md:block md:w-[350px] col-span-2 md:h-[350px] lg:w-[400px] lg:h-[400px]">
            <img
              className="w-full h-full mix-blend-multiply"
              src={pay}
              alt="buy"
            />
          </div>
         
          <div className=" overflow-hidden col-span-2 text-sm w-[100vw] mx-auto md:mx-0  h-full min-[450px]:w-[95%] min-[450px]:h-[85%]  flex flex-col justify-center items-center bg-white p-4 space-y-1 rounded-xl shadow-lg">
            <p className="mx-auto text-zinc-700 text-lg font-medium">Sign Up</p>

            <div className="scroll grid grid-cols-1  space-y-2 gap-2 md:gap-5 w-full h-full overflow-y-auto pb-[70px] min-[450px]:pr-2">
              <div className="mt-[0.5rem] form-group space-y-1 w-full">
                <label
                  className="block font-medium text-zinc-700"
                  htmlFor="name"
                >
                  Store Name
                </label>
                <input
                  className="block form__input input-field border border-black  rounded-md focus:outline-none w-full h-10 sm:h-11 px-4"
                  type="text"
                  placeholder="Enter your store name"
                  name="name"
                  onChange={(e) => setStorename(e.target.value)}
                />
              </div>
              <div className="form-group space-y-1 w-full">
                <label
                  className="block font-medium text-zinc-700"
                  htmlFor="address"
                >
                  Location Address
                </label>
                <input
                  className="block form__input input-field border border-black  rounded-md focus:outline-none w-full h-10 sm:h-11 px-4"
                  type="text"
                  placeholder="Enter your location address"
                  name="address"
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className="form-group space-y-1 w-full">
                <label
                  className="block font-medium text-zinc-700"
                  htmlFor="tel number"
                >
                  Phone Number
                </label>
                <input
                  className="block form__input input-field border border-black  rounded-md focus:outline-none w-full h-10 sm:h-11 px-4"
                  type="number"
                  placeholder="Phone Number"
                  name="tel number"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              <div className="form-group space-y-1 w-full">
                <label
                  className="block font-medium text-zinc-700"
                  htmlFor="email"
                >
                  Email Address
                </label>
                <input
                  className="block form__input input-field border border-black  rounded-md focus:outline-none w-full h-10 sm:h-11 px-4"
                  type="email"
                  placeholder="Enter your email address"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group space-y-1 w-full">
                <label
                  className="block font-medium text-zinc-700"
                  htmlFor="name"
                >
                  Business Type
                </label>
                <input
                  className="block form__input input-field border border-black  rounded-md focus:outline-none w-full h-10 sm:h-11 px-4"
                  type="text"
                  placeholder="Business type"
                  name="name"
                  onChange={(e) => setBusinessType(e.target.value)}
                />
              </div>
              <div className="form-group space-y-1 w-full">
                <label
                  className="block font-medium text-zinc-700"
                  htmlFor="name"
                >
                  Business Description
                </label>
                <input
                  className="block form__input input-field border border-black  rounded-md focus:outline-none w-full h-10 sm:h-11 px-4"
                  type="text"
                  placeholder="Business description (Optional)"
                  name="name"
                  onChange={(e) => setBizdescription(e.target.value)}
                />
              </div>
              <div className="form-group space-y-1 w-full">
                <label
                  className="block font-medium text-zinc-700"
                  htmlFor="name"
                >
                  CAC Registration (Optional)
                </label>
                <input
                  accept="image/jpeg, image/png, image/jpg"
                  type="file"
                  placeholder="Business description (Optional)"
                  name="name"
                  onChange={(e) => handleCAC(e)}
                />
              </div>
            
              <div className="form-group space-y-1 w-full">
              <div className="form-group font-medium space-y-1 w-full">
               Bank Account Details
              </div>

                <label
                  className="block font-medium text-zinc-700"
                  htmlFor="name"
                >
                  Account Name
                </label>
                <input
                  className="block form__input input-field border border-black  rounded-md focus:outline-none w-full h-10 sm:h-11 px-4"
                  type="text"
                  placeholder="Account name"
                  name="name"
                  onChange={(e) => setAccountName(e.target.value)}
                />
              </div>
              <div className="form-group space-y-1 w-full">
                <label
                  className="block font-medium text-zinc-700"
                  htmlFor="name"
                >
                  Account Number
                </label>
                <input
                  className="block form__input input-field border border-black  rounded-md focus:outline-none w-full h-10 sm:h-11 px-4"
                  type="text"
                  placeholder="Account Number"
                  name="name"
                  onChange={(e) => setAcctNumber(e.target.value)}
                />
              </div>
              <div className="form-group space-y-1 w-full">
                <label
                  className="block font-medium text-zinc-700"
                  htmlFor="name"
                >
                  Bank Name
                </label>
                <input
                  className="block form__input input-field border border-black  rounded-md focus:outline-none w-full h-10 sm:h-11 px-4"
                  type="text"
                  placeholder="Bank name"
                  name="name"
                  onChange={(e) => setBankname(e.target.value)}
                />
              </div>
              <div className="form-group space-y-1 w-full">
                <label
                  className="block font-medium text-zinc-700"
                  htmlFor="password"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    className="block form__input input-field border pr-6 border-black rounded-md focus:outline-none w-full  h-10 sm:h-11 px-4"
                    type={showPassword ? "text" : "password"}
                    placeholder=""
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                    className="absolute right-3 top-3 max-[450px]:top-[0.5rem]"
                  >
                    <img
                      src={viewpassword}
                      alt="viewpassword"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              <button
              onClick={handleSubmit}
              className="bg-[#009999]  text-white sm:py-3 mx-auto py-2 rounded-md flex items-center w-[50%] justify-center"
            >
              {loading ? <Loader /> : <span>Sign Up</span>}
            </button>

            
            <span className="mx-auto  ">Are you a registered seller? <span 
              onClick={() => {
                navigate("/seller/login")
              }}
              className='mr-3 text-blue-700'>Log in</span></span>
            </div>
           
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default MerchantSignUp;
