import React from "react";
import { MdNavigateBefore } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/waveb.png";

const GroupHeaders = ({ headings }) => {
  const navigate = useNavigate();
  return (
    <div className="min-[450px]:hidden fixed flex justify-between border-b shadow-lg items-center inset-x-0 px-3 py-2 bg-white z-40">
      <div className="flex space-x-2 items-center">
        <div
          onClick={() => {
            navigate(-1);
          }}
          className="">
          <MdNavigateBefore className="text-[22px] text-black " />
        </div>

        <div className="flex space-x-2 items-center max-[450px]:hidden">
          <div className="w-10 h-6">
            <img className="w-full h-full" src={logo} alt="" />
          </div>
          <p className="uppercase special font-semibold text-[#009999]">Wave Bugdet</p>
        </div>
      </div>
      <div className="fonr-medium text-black capitalize">{headings}</div>
      <div className="w-5 h-5 bg-none"></div>
    </div>
  );
};

export default GroupHeaders;
