/* eslint-disable no-useless-concat */
import React from "react";
import { IoIosCash } from "react-icons/io";
import { AiOutlineDeliveredProcedure } from "react-icons/ai";
import { GiTakeMyMoney } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

const MobileCards = () => {
  const navigate = useNavigate();

  function Lservices() {
    const url =
      "https://chat.whatsapp.com/GUDhGNfC2mYGu9qvTiuoQV" +
      "Earn more than # 100,000 monthly. share our bestselling quality and affordable products to your loved ones and earn instant commition when they buy through you. click here to join our agent group for updates:";

    window.open(url, "blank").focus();
  }

  function Rdelivery() {
    const url =
      "https://wa.me/2348137960202?text=" +
      "Hi, I will like to buy  (insert product name)  on instalment, my location is (insert locatio), and i will like it to be deliverd to me on (insert date) ";

    window.open(url, "blank").focus();
  }

  return (
    <div className="max-[450px]:mt-[52px] w-full mob-none h-fit overflow-hidden">
      <div className="mt-[1rem] hidescroll overflow-x-auto pl-2 pr-4  grid text-white grid-cols-3 gap-[8.5rem] w-full h-12">
        <div onClick={Lservices} className="flex items-center w-[150px] justify-center space-x-2 h-full rounded-lg bg-[#009999] px-2">
          <GiTakeMyMoney className="text-white text-[20px]" />
          <p className=" text-sm">Earn from Shopers</p>
        </div>
        <div
          onClick={() => {
            navigate("/seller/register");
          }}
          className="flex items-center justify-center space-x-2 h-full rounded-lg bg-orange-500 min-w-max px-2">
          <IoIosCash className="text-white text-[20px]" />
          <p className=" text-sm">Become a Seller</p>
        </div>
        <div onClick={Rdelivery} className="flex items-center justify-center space-x-2 h-full rounded-lg bg-cyan-600 min-w-max px-2">
          <AiOutlineDeliveredProcedure className="text-white text-[20px]" />
          <p className=" text-sm">Pay on Installment</p>
        </div>
      </div>
    </div>
  );
};

export default MobileCards;
