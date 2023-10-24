import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { IoMdAddCircle } from "react-icons/io";
import { MdOutlineEditNote } from "react-icons/md";
import { HiHome, HiOutlineHome } from "react-icons/hi";
import MerchantNav from "./categoryNav";
import { getExistingDoc } from "firebasedatas/firebaseAuth";
import { useNavigate } from "react-router-dom";
import { HiOutlineUserCircle, HiUserCircle } from "react-icons/hi";
import { SiSellfy } from "react-icons/si";
import { useSelector } from "react-redux";
const AdminMobileDashboard = () => {

  const [ismobile, setismobile] = useState(false);
  const { pathname } = useLocation();

  const navigate = useNavigate();


  return (
    <>
      <div className="w-full sm:hidden h-fit text-sm fixed bottom-0 inset-x-0 shadow-lg border-t text-zinc-800 bg-white z-50">
        <div className="w-full flex justify-between items-center py-2 px-6">
          {pathname === "/admin/merchant" ? (
            <div
              onClick={() => {
                navigate("/admin/merchant");
              }}
              className="text-[#009999] flex flex-col space-y-1 items-center justify-center"
            >
              <SiSellfy className="text-[20px]" />
              <span className="font-medium"> Merchant</span>
            </div>
          ) : (
            <div
              onClick={() => {
                navigate("/admin/merchant");
              }}
              className="text-zinc-800 flex flex-col space-y-1 items-center justify-center"
            >
              <SiSellfy className="text-[20px]" />
              <span className="font-normal">Merchant</span>
            </div>
          )}

          {pathname === "/admin/home" ? (
            <div
              onClick={() => {
                navigate("/admin/home");
              }}
              className="text-[#009999] flex flex-col space-y-1 items-center justify-center"
            >
              <HiHome className="text-[20px]" />
              <span className="font-medium"> Home</span>
            </div>
          ) : (
            <div
              onClick={() => {
                navigate("/admin/home");
              }}
              className="text-zinc-800 flex flex-col space-y-1 items-center justify-center"
            >
              <HiOutlineHome className="text-[20px]" />
              <span className="font-normal">Home</span>
            </div>
          )}

          {pathname === "/admin/customer" ? (
            <div
              onClick={() => {
                navigate("/admin/customer");
              }}
              className="text-[#009999] flex flex-col space-y-1 items-center justify-center"
            >
              <HiUserCircle className="text-[20px]" />
              <span className="font-normal">Customer</span>
            </div>
          ) : (
            <div
              onClick={() => {
                navigate("/admin/customer");
              }}
              className="text-zinc-800 flex flex-col space-y-1 items-center justify-center"
            >
              <HiOutlineUserCircle className="text-[20px]" />
              <span className="font-normal">Customer</span>
            </div>
          )}
        </div>
      </div>
      
    </>
  );
};

export default AdminMobileDashboard;
