/* eslint-disable no-useless-concat */
import React, { useState, useEffect } from "react";
import logo from "../../../../assets/images/waveb.png";
import "../../../../index.css";
import { FaPhoneAlt, FaShoppingCart, FaUser } from "react-icons/fa";
import AuthCard from "../authcard/authcard";
import CartCard from "../minicartcard/miniCard";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getExistingDoc } from "firebasedatas/firebaseAuth";
import { FaWhatsapp } from "react-icons/fa";
const Header = () => {
  const { numOfCartItems } = useSelector((state) => state.cart);
  const [isVisible, setisVisisble] = useState(false);
  const [isUser, setisUser] = useState(false);
  const [isMobile, setisMobile] = useState(false);
  const [isCart, setisCart] = useState(false);
  const [name, setname] = useState();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    if (!currentUser) return;
    async function getUser() {
      await getExistingDoc(currentUser)
        .then((res) => {
          setname(res.name);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    getUser();
  }, [currentUser]);

  const handleMobileSignin = () => {
    navigate("/userinfo");
  };

  function Rdelivery() {
    const url = "https://wa.me/2348137960202?text=" + "   I want to know more about WaveBudget";

    window.open(url, "blank").focus();
  }
  return (
    <div className="bg-white w-full cursor-pointer p-2 min-[450px]:py-3 min-[450px]:px-5 shadow-lg flex justify-between items-center border-b">
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

      <div className=" cursor-pointer flex items-center sm:space-x-4 space-x-2">
        <p>Contact Us Via </p>
        <div className="flex items-center gap-1 cursor-pointer">
          <FaPhoneAlt className="text-[black] text-2xl" />
          <p>08137960202</p>
        </div>
        <div className="flex items-center gap-1 cursor-pointer" onClick={Rdelivery}>
          <FaWhatsapp className="text-[green] text-2xl" />
          <p>08137960202</p>
        </div>
        <div
          onClick={() => {
            handleMobileSignin();
          }}
          onMouseEnter={() => {
            if (name) {
              setisVisisble(false);
              setisUser(true);
            } else {
              setisVisisble(true);
              setisUser(false);
            }
          }}
          onMouseLeave={() => {
            setisVisisble(false);
            setisUser(false);
          }}
          className="group relative flex text-black">
          <div className="flex group-hover:text-[#009999] text-[16px] items-center space-x-2">
            {name ? <span className="capitalize  text-sm">{name.split(" ")[0] || name}</span> : <span className="min-w-max text-sm">Sign in</span>}
            <FaUser className=" " />
          </div>

          <AuthCard isVisible={isVisible} isUser={isUser} isMobile={isMobile} setisMobile={setisMobile} />
        </div>
        <div
          onClick={() => {
            navigate("/cart");
          }}
          onMouseEnter={() => {
            setisCart(true);
          }}
          onMouseLeave={() => {
            setisCart(false);
          }}
          className="relative">
          {numOfCartItems > 0 && (
            <div className="hidden min-[450px]:flex absolute top-[-10px] right-[-10px] bg-[#009999] rounded-full px-2  text-[10px] text-white  items-center justify-center ">
              <span>{numOfCartItems}</span>
            </div>
          )}
          <FaShoppingCart className="hidden min-[450px]:block hover:text-[#009999]" />
          <CartCard isCart={isCart} name={name} items={numOfCartItems} />
        </div>
      </div>
    </div>
  );
};

export default Header;
