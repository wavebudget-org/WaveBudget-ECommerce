import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./admindesktopDash.scss";
import { AiOutlineMenu } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";

const AdminDesktopDashboard = () => {
  const navigate = useNavigate();
  const [isOpen, setisOpen] = useState(false);
  const { pathname } = useLocation();

  const setOpen = (e) => {
    e.stopPropagation();
    setisOpen(!isOpen);
  };

  return (
    <div
      onClick={(e) => {
        setOpen(e);
      }}
      className={isOpen ? "wrapper let swipeInLeft fixed z-20 cursor-pointer hs h-full" : "fixed cursor-pointer hs h-full z-20 nowrapper  let swipeInLeft"}>
      <div className={isOpen ? "menuhide let swipeInLeft p-1 sm:p-2" : "p-1 sm:p-2 menu let swipeInLeft"}>
        <div
          onClick={(e) => {
            setOpen(e);
          }}>
          <AiOutlineMenu className="text-[25px] text-white" />
        </div>
      </div>

      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={isOpen ? "dashhideshow let swipeInLeft px-4  sm:px-12 h-full" : "dashshow let swipeInLeft px-4  sm:px-12 h-full"}>
        <div className="uppercase font-bold text-white mb-3">Dashboard</div>
        <div className="bg-none h-2 mb-3 w-2"></div>
        <Link
          to={`/admin/home`}
          className={`hover:text-white hover:font-normal  ${pathname === `/admin/home` ? "font-medium text-gray-200" : "font-light text-gray-200"}
          `}>
          Home
        </Link>
        <div className="bg-none h-2 w-2"></div>
        <Link
          to={`/admin/customer`}
          className={`hover:text-white hover:font-normal  ${pathname === `/admin/customer` ? "font-medium text-gray-200" : "font-light text-gray-200"}
          `}>
          Customers
        </Link>
        <div className="my-3">
          <div
            onClick={() => {
              navigate("/admin/merchant");
            }}
            className={`${pathname === "/admin/merchant/" ? "font-normal" : "font-light"} text-gray-200 hover:text-white mb-3 hover:font-normal flex items-center space-x-1`}>
            <span>Merchants </span>
          </div>
        </div>
        <div className="my-3">
          <div
            onClick={() => {
              navigate("/admin/orders");
            }}
            className={`${pathname === "/admin/orders/" ? "font-normal" : "font-light"} text-gray-200 hover:text-white mb-3 hover:font-normal flex items-center space-x-1`}>
            <span>Orders </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDesktopDashboard;
