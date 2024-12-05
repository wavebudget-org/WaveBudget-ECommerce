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
import { useForm } from "react-hook-form";
import { sendEmailVerification } from "firebase/auth";
const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const submit = async (e) => {
    setLoading(true);

    let form = {
      name: e.name,
      email: e.email,
      type: "Customer",
      phone: e.phone,
    };

    await userRegistration(e.email, e.password)
      .then(async (res) => {
        const { uid } = res.user;
        console.log(uid);
        await saveData(res.user.uid, { userId: res.user.uid, ...form })
          .then((res2) => {
            sendEmailVerification(res.user)
              .then(() => {
                dispatch(GetUsersSuccess(uid));
                toast.success("Successful Registration!!! Please verify your email address");
                reset();
                navigate("/");
              })
              .catch((err) => {
                console.log(err);
                toast.error(err.code);
              });
          })
          .catch((err) => {
            console.log(err);
            toast.error(err.code);
          });
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.code);
        setLoading(false);
      });
  };

  return (
    <div className="w-full h-full cursor-pointer fixed inset-0 ">
      <div className="w-full h-full">
        <div className="bg-white py-3 px-6 min-[450px]:py-4 min-[450px]:px-4">
          <div
            onClick={() => {
              navigate("/");
            }}
            className="flex space-x-2 items-center">
            <div className="w-10 h-6">
              <img className="w-full h-full" src={logo} alt="" />
            </div>
            <div className="flex flex-col justify-start">
              <div className="uppercase font-semibold text-[#009999]">Wave</div>
              <div className="uppercase font-semibold text-[#009999]">Budget</div>
            </div>
          </div>
        </div>
        <div className="bg-gray-300 text-sm flex justify-around  w-full h-full items-center">
          <div className="hidden md:block w-[350px] h-[350px] lg:w-[400px] lg:h-[400px]">
            <img className="w-full h-full mix-blend-multiply" src={pay} alt="pay" />
          </div>

          <form
            onSubmit={handleSubmit(submit)}
            className="w-[80vw] h-fit min-[450px]:w-[60%] min-[450px]:h-fit md:w-[350px] md:h-fit lg:w-[400px] lg:h-fit flex flex-col justify-center items-center bg-white p-4 space-y-3 rounded-xl shadow-lg">
            <p className="text-zinc-800 font-semibold">Sign Up</p>
            <div className="form-group space-y-3 w-full">
              <label className="block font-semibold text-zinc-800" htmlFor="name">
                Name
              </label>
              <input
                className="block form__input input-field border border-black  rounded-md focus:outline-none w-full  h-10 sm:h-11 px-4"
                type="text"
                placeholder="Enter your name"
                name="name"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && <span className="font-small text-[#FF0000]">{errors.name.message}</span>}
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
                {...register("email", { required: "Email Address is required" })}
              />
              {errors.email && <span className="font-small text-[#FF0000]">{errors.email.message}</span>}
            </div>
            <div className="form-group space-y-3 w-full">
              <label className="block font-semibold text-zinc-800" htmlFor="email">
                Phone
              </label>
              <input
                className="block form__input input-field border border-black  rounded-md focus:outline-none w-full  h-10 sm:h-11 px-4"
                type="text"
                placeholder="Enter your Phone"
                name="phone"
                {...register("phone", { required: "Phone is required" })}
              />
              {errors.phone && <span className="font-small text-[#FF0000]">{errors.phone.message}</span>}
            </div>
            <div className="form-group space-y-3 w-full">
              <label className="block font-semibold text-zinc-800" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <input
                  className="block form__input input-field border pr-6 border-black rounded-md focus:outline-none w-full  h-10 sm:h-11 px-4"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter a password"
                  name="password"
                  {...register("password", { required: "Password is required" })}
                />
                <div
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                  className="absolute right-3 top-3 max-[450px]:top-[0.5rem]">
                  <img src={viewpassword} alt="viewpassword" className="w-full h-full object-cover" />
                </div>
              </div>
              {errors.password && <span className="font-small text-[#FF0000]">{errors.password.message}</span>}
            </div>

            <button type="submit" className="bg-[#009999] text-white sm:py-3 py-2 rounded-md flex items-center w-full justify-center">
              {loading ? <Loader /> : <span>Sign up</span>}
            </button>

            <span>
              Already have an account?{" "}
              <span
                onClick={() => {
                  navigate("/signin");
                }}
                className="mr-3 text-blue-700">
                Sign in
              </span>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
