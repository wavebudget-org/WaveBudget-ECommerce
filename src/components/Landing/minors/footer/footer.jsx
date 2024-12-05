import React from "react";
import "./footer.scss";
import { AiFillTwitterCircle, AiFillInstagram } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { CgCopyright } from "react-icons/cg";
import master from "../../../../assets/Svg/mastercard.svg";
import visa from "../../../../assets/Svg/visa.svg";
import paystack from "../../../../assets/Svg/paystack.svg";

const WaveFooter = () => {
  return (
    <div className="w-full p-4 bg-emerald-500 text-white max-[450px]:pb-[90px] hidden md:block">
      <div className="grid grid-cols-1 gap-4 grid_desk">
        <div className="flex flex-col space-y-2 sm:space-y-3 justify-start">
          <p>Follow us on:</p>
          <div className="flex  space-x-2">
            <MdEmail
              onClick={() => {
                // const url = "https://wa.me/2348137960202?text=" + "   I want to know more about the delivery service and process ";
                // window.open(url, "blank").focus();
              }}
            />
            <BsFacebook
              onClick={() => {
                const url = "https://www.facebook.com/wavebudget";
                window.open(url, "blank").focus();
              }}
            />
            <AiFillTwitterCircle
              onClick={() => {
                const url = "https://www.x.com/wavebudget";
                window.open(url, "blank").focus();
              }}
            />
            <AiFillInstagram
              onClick={() => {
                const url = "https://www.instagram.com/wavebudget";
                window.open(url, "blank").focus();
              }}
            />
          </div>
          <div>Office Address: 3rd floor, saint James house, wuse 2 Abuja</div>
        </div>

        <div className="flex flex-col space-y-2 sm:space-y-3 justify-start">
          <p>About us</p>
          <p>Terms and Conditions</p>
          <p>FAQ</p>
        </div>
      </div>
      <div className="flex w-full justify-between items-center py-2">
        <div className="flex items-center justify-start">
          <span className="sm:text-lg text-sm">
            <CgCopyright />
          </span>
          <span className="mr-2">{`Copyright ${new Date().getFullYear()}`}</span>
        </div>

        <div className="flex space-x-2 sm:space-x-3">
          <div className="h-8 w-16 rounded-sm bg-gray-100 p-1 sm:h-10 sm:w-24">
            <img className="w-full h-full object-fill" src={paystack} alt="pay" />
          </div>
          <div className="h-8 w-16 rounded-sm bg-gray-100 p-1 sm:h-10 sm:w-24">
            <img className="w-full h-full object-fill" src={visa} alt="pay" />
          </div>
          <div className="h-8 w-16 rounded-sm bg-gray-100 p-1 sm:h-10 sm:w-24">
            <img className="w-full h-full object-fill" src={master} alt="pay" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaveFooter;
