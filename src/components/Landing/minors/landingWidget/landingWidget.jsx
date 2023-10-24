import React,{useState} from "react";
import "./landingWidget.scss";
import pxl from "../../../../assets/images/pxl.jpg";
import { toast } from "react-hot-toast";
import { CiShare2 } from "react-icons/ci";
import {IoIosClose} from 'react-icons/io'
import copy from "copy-to-clipboard"; 
const LandingWidget = ({ name, descriptions, image, id, price }) => {
  const [link,setLink] = useState()
  const [isShare, setisShare] = useState(false)
  
  console.log(name, descriptions, price, id);
  return (
    <>
      <div className=" pb-2 group w-[160px] flex flex-col space-y-2 overflow-hidden h-fit ld_widget bg-white rounded-md sm:rounded-lg">
        <div className="w-full h-full cursor-pointer duration-300">
          <div className="relative w-full h-[140px] img_sz overflow-hidden">
            <img
              className="h-full w-full object-cover min-[450px]:object-fill transform duration-200 group-hover:scale-105"
              src={image}
              alt=""
            />
            <div
              onClick={(e) => {
                e.stopPropagation();
                setLink(`https://wavebudget.vercel.app/product/${id}`)
                setisShare(!isShare)
              }}
              className="absolute top-2 right-2 bg-black text-white p-1 rounded-full"
            >
              <CiShare2 className="text-[14px] min-[450px]:text-[20px]" />
            </div>
          </div>
          <div className="mt-2 px-2 min-[450px]:space-y-2 space-y-1 text-sm sm:text-[15px]">
            <p className="truncate  w-[100vw] text-zinc-700 sm:pr-[10%]">
              <span className="text-ellipsis whitespace-nowrap overflow-hidden w-[150px] min-[450px]:w-[190px]">
                {name}
              </span>
            </p>
            <p className="truncate w-[98vw] text-zinc-700 font-thin sm:pr-[10%] flex flex-wrap overflow-hidden">
              <span className="text-ellipsis whitespace-nowrap overflow-hidden w-[150px] min-[450px]:w-[190px]">
                {descriptions}
              </span>
            </p>
          </div>
          <div className="mt-2 min-[450px]:mt-5 px-2 text-[15px] font-medium sm:font-semibold text-zinc-700">
            {" "}
            {`₦${price}`}
          </div>
        </div>
      </div>
      <div
      onClick={() => {
        setisShare(!isShare)
      }}
      className={isShare?" fixed text-zinc-700 z-[99] inset-0 h-full w-full bg-black bg-opacity-[0.5] flex items-center justify-center": "hidden"}>
        <div 
        onClick={(e)=> {
          e.stopPropagation()
        }}
        className="lets swipeDown space-y-3 min-[450px]:space-y-4 max-[450px]:w-[90%] bg-white rounded-xl max-[450px]:rounded-lg p-4 w-[450px] m-auto absolute inset-x-0 h-fit flex flex-col justify-center items-center">
         <div
         onClick={(e) => {
          e.stopPropagation();
          setisShare(!isShare)
         }}
         className="absolute text-zinc-700 top-2 right-2">
          <IoIosClose className="text-[20px]"/>
         </div>
         
          <input
            type="text"
            name="text"
            value={link}
            readOnly
            className="w-full min-[450px]:h-9 md:h-11 outline-none border border-gray-200 bg-white text-zinc-700 rounded-xl max-[450px]:rounded-lg "
          />
          <button
           onClick={(e)=> {
            e.stopPropagation()
            copy(link)
            toast.success(`successfully copied`)
            //setisShare(!isShare)
          }}
           className="border p-1 focus:bg-gray-200">Copy link</button>
        </div>
      </div>
    </>
  );
};

export default LandingWidget;
