import React, { useState } from "react";
import buy from "../../../assets/images/buy.jpg";
import logo from "../../../assets/images/waveb.png";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "firebasedatas/firebaseAuth";
import Loader from "components/UI/Loader";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";

const Forgot = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const submit = async (e) => {
    setLoading(true);
    await forgotPassword(e.email)
      .then((res) => {
        toast.success("Password Reset link sent to Email");
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        const errorCode = error.code;
        // const errorMessage = error.message;
        toast.error(errorCode);
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
        <div className="bg-teal-100 flex justify-around  w-full h-full items-center">
          <div className="hidden md:block md:w-[350px] md:h-[350px] lg:w-[400px] lg:h-[400px]">
            <img className="w-full h-full mix-blend-multiply" src={buy} alt="buy" />
          </div>

          <form
            onSubmit={handleSubmit(submit)}
            className="w-[80vw] h-fit min-[450px]:w-[60%] text-sm md:w-[350px]  lg:w-[400px]  flex flex-col justify-center items-center bg-white p-4 space-y-3 rounded-xl shadow-lg">
            <p className="text-zinc-800 font-semibold">Forgot Password</p>
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

            <button type="submit" className="bg-[#009999] text-white sm:py-3 py-2 rounded-md flex items-center w-full justify-center">
              {loading ? <Loader /> : <span>Submit</span>}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Forgot;
