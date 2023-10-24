import React, { useState, useEffect } from "react";
import logo from "../../../../assets/images/waveb.png";
import "../../../../index.css";
import { MdNavigateBefore } from "react-icons/md";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import AuthCard from "../authcard/authcard";
import CartCard from "../minicartcard/miniCard";
import { IoIosSearch } from "react-icons/io";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

import { getExistingDoc } from "firebasedatas/firebaseAuth";
const VisHeader = () => {
  const { numOfCartItems } = useSelector((state) => state.cart);
  const [isVisible, setisVisisble] = useState(false);
  const [isCart, setisCart] = useState(false);
  const [searchText, setsearchText] = useState();
  const [name, setname] = useState();
  const [isMobile, setisMobile] = useState(false);
  const [isUser, setisUser] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const { pathname } = useLocation();

  useEffect(() => {
    if (!currentUser) return;
    async function getUser() {
      await getExistingDoc(currentUser)
        .then((res) => {
          console.log(res);
          setname(res.name);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    getUser();
  }, []);

  const handleMobileSignin = () => {
  
        navigate("/userinfo");
   
  };

  return (
    <div className="cursor-pointer bg-white max-[450px]:fixed max-[450px]:inset-x-0 z-40 max-[450px]:top-0 w-full p-2 min-[450px]:py-3 min-[450px]:px-5 shadow-lg flex justify-between items-center border-b">
      <div
        onClick={() => {
          navigate("/");
        }}
        className="flex space-x-2 items-center"
      >
        <div className="w-10 h-6">
          <img className="w-full h-full" src={logo} alt="" />
        </div>
        <div className="flex flex-col justify-start">
          <div className="uppercase font-semibold text-[#009999]">Wave</div>
          <div className="uppercase font-semibold text-[#009999]">Budget</div>
        </div>
      </div>

      <div className="hidden min-[450px]:block relative w-[50%] h-6 min-[450px]:h-9 md:h-[2.3rem] rounded-md">
        <input
          onChange={(e) => {
            setsearchText(e.target.value);
          }}
          type="text"
          name="text"
          placeholder="search"
          value={searchText}
          id="text"
          className="w-full h-full rounded-md border border-[#009999] px-8 outline-none"
        />
        <div className="absolute px-2 h-full flex top-0 rounded-r-md space-x-2 justify-center items-center right-0 bg-[#009999] text-white ">
          <IoIosSearch />
          <span>Search</span>
        </div>
      </div>

      <div className=" cursor-pointer flex items-center sm:space-x-4 space-x-2">
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
          className="group relative flex text-black"
        >
          <div className="flex group-hover:text-[#009999] text-[16px] items-center space-x-2">
            {name ? (
              <span className="capitalize  text-sm">
                {name.split(" ")[0] || name}
              </span>
            ) : (
              <span className="min-w-max text-sm">Sign in</span>
            )}
            <FaUser className=" " />
          </div>

          <AuthCard
            isVisible={isVisible}
            isUser={isUser}
            isMobile={isMobile}
            setisMobile={setisMobile}
          />
        </div>
        <div
          onClick={() => {
            if (pathname !== "/cart") {
              navigate("/cart");
            }
          }}
          onMouseEnter={() => {
            setisCart(true);
          }}
          onMouseLeave={() => {
            setisCart(false);
          }}
          className="relative"
        >
          {numOfCartItems > 0 && (
            <div className=" hidden min-[450px]:flex absolute top-[-10px] right-[-10px] bg-[#009999] rounded-full px-2  text-[10px] text-white items-center justify-center">
              <span>{numOfCartItems}</span>
            </div>
          )}
          <FaShoppingCart className="hidden min-[450px]:block hover:text-[#009999]" />

          {numOfCartItems === 0 && (
            <CartCard name={name} items={numOfCartItems} isCart={isCart} />
          )}
        </div>
      </div>
    </div>
  );
};

export default VisHeader;
