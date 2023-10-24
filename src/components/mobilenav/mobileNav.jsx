import React from "react";
import {
  HiOutlineHome,
  HiHome,
  HiOutlineUserCircle,
  HiUserCircle,
} from "react-icons/hi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaShoppingCart } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

const MobileNav = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate()

  return (
    <div className="min-[450px]:hidden border-t shadow-lg fixed w-full bg-white inset-x-0 flex justify-between py-2 px-4 bottom-0">
      {pathname === "/" ? (
        <div
        onClick={() => {
          navigate("/")
         }}
        className="text-[#009999] flex flex-col space-y-1 items-center justify-center">
          <HiHome className="text-[20px]" />
          <span className="font-medium"> Home</span>
        </div>
      ) : (
        <div 
        onClick={() => {
          navigate("/")
         }}
        className="text-zinc-800 flex flex-col space-y-1 items-center justify-center">
          <HiOutlineHome className="text-[20px]" />
          <span className="font-normal">Home</span>
        </div>
      )}
      {pathname === "/cart" ? (
         <div
         onClick={() => {
          navigate("/cart")
         }}
         className="text-[#009999] flex flex-col  shadow-lg border-t space-y-1 items-center justify-center">
         <FaShoppingCart className="text-[20px]"/>
         <span className="font-medium">Cart</span>
       </div>
        
      ) : (
        <div
        onClick={() => {
          navigate("/cart")
         }}
        className="text-zinc-800 z-[60] flex flex-col space-y-1 items-center justify-center">
         <AiOutlineShoppingCart className="text-[20px]" />
          <span className="font-normal">Cart</span>
        </div>
       
      )}
      {pathname === "/userinfo" ? (
          <div
          onClick={() => {
            navigate("/userinfo")
           }}
          className="text-[#009999] flex flex-col space-y-1 items-center justify-center">
      
      <HiUserCircle className="text-[20px]" />
          <span className="font-normal">My wave</span>
          </div>
      ) : (
        <div
        onClick={() => {
          navigate("/userinfo")
         }}
        className="text-zinc-800 flex flex-col space-y-1 items-center justify-center">
         <HiOutlineUserCircle className="text-[20px]"/>
         <span className="font-normal">My wave</span>
       </div>
       
      )}
    </div>
  );
};

export default MobileNav;
