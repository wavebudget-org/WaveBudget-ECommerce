import React, { useState } from "react";
import pay from "../../../assets/images/pay.png";
import viewpassword from "../../../assets/Svg/viewpassword.svg";
import logo from "../../../assets/images/waveb.png";
import Loader from "components/UI/Loader";
import { userRegistration } from "firebasedatas/firebaseAuth";
import { saveData } from "firebasedatas/storeRegdata";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { GetUsersSuccess } from "Redux/Actions/ActionCreators";
const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSubmit = async () => {
    setLoading(true);
    const validateData = {
      name,
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
      name,
      email,
      type: "Customer",
    };

    await userRegistration(email, password)
      .then( async(res) => {
        console.log(res.user.uid);
        //setuserId(res.user.uid);
        const {uid} = res.user
        console.log(uid);
        await saveData(res.user.uid, {userId:res.user.uid, ...form})
        .then((res) => {
          console.log(res);
          dispatch(GetUsersSuccess(uid))
          toast.success("successful registration");
          setName("")
          setEmail("")
          setPassword("")
          navigate("/")
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.code);
        });
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.code)
        setLoading(false);
      });

    //console.log('this is the form',form)


      
  };

  return (
    <div className="w-full h-full cursor-pointer fixed inset-0 ">
      <div className="w-full h-full">
        <div className="bg-white py-3 px-6 min-[450px]:py-4 min-[450px]:px-4">
          <div
          onClick={() => {
            navigate("/")
          }}
          className="flex space-x-2 items-center">
            <div className="w-10 h-6">
              <img className="w-full h-full" src={logo} alt="" />
            </div>
            <div className="flex flex-col justify-start">
              <div className="uppercase font-semibold text-[#009999]">Wave</div>
              <div className="uppercase font-semibold text-[#009999]">
                Budget
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-300 text-sm flex justify-around  w-full h-full items-center">
          <div className="hidden md:block w-[350px] h-[350px] lg:w-[400px] lg:h-[400px]">
            <img
              className="w-full h-full mix-blend-multiply"
              src={pay}
              alt="pay"
            />
          </div>

          <div className="w-[80vw] h-fit min-[450px]:w-[60%] min-[450px]:h-fit md:w-[350px] md:h-fit lg:w-[400px] lg:h-fit flex flex-col justify-center items-center bg-white p-4 space-y-3 rounded-xl shadow-lg">
            <p className="text-zinc-800 font-semibold">Sign Up</p>
            <div className="form-group space-y-3 w-full">
              <label
                className="block font-semibold text-zinc-800"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className="block form__input input-field border border-black  rounded-md focus:outline-none w-full  h-10 sm:h-11 px-4"
                type="text"
                placeholder="Enter your name"
                name="name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group space-y-3 w-full">
              <label
                className="block font-semibold text-zinc-800"
                htmlFor="email"
              >
                Email Address
              </label>
              <input
                className="block form__input input-field border border-black  rounded-md focus:outline-none w-full  h-10 sm:h-11 px-4"
                type="email"
                placeholder="Enter your email address"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group space-y-3 w-full">
              <label
                className="block font-semibold text-zinc-800"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <input
                  className="block form__input input-field border pr-6 border-black rounded-md focus:outline-none w-full  h-10 sm:h-11 px-4"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter a password"
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
              className="bg-[#009999] text-white sm:py-3 py-2 rounded-md flex items-center w-full justify-center"
            >
              {loading ? <Loader /> : <span>Sign up</span>}
            </button>
          
                  
              <span>Already have an account? <span 
              onClick={() => {
                navigate("/signin")
              }}
              className='mr-3 text-blue-700'>Sign in</span></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
