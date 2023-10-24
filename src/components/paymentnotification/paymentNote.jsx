import React, { useState } from "react";
import { IoIosClose } from "react-icons/io";
import timeFormat from "Utils/timeFormat";
import { useDispatch, useSelector } from "react-redux";
import { getPaymentstatus } from "Redux/Actions/ActionCreators";
const PaymentNotification = ({ isNote, setisNote, transHistory }) => {
  const dispatch = useDispatch()
  const {payStatus} = useSelector((state) => state.user)
  const dt = new Date();
  const month = dt.toLocaleString("default", { month: "long" });
  const day = dt.getDate();
  const year = dt.getFullYear();
  let hours, minutes, seconds, amPm;
 // const {name, price, status, storeName, curPrice, count} = transHistory

  return (
    <div
      onClick={() => {
        setisNote(!isNote);
        dispatch(getPaymentstatus(''))
      }}
      className={
        isNote
          ? " fixed text-zinc-700 z-[99] inset-0 h-full w-full bg-black bg-opacity-[0.5] flex items-center justify-center"
          : "hidden"
      }
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="lets swipeDown overflow-hidden space-y-2 min-[450px]:space-y-3 max-[450px]:w-[90%] bg-white rounded-xl max-[450px]:rounded-lg p-2 w-[450px] m-auto absolute inset-x-0 h-[280px] flex flex-col justify-start items-center"
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
            setisNote(!isNote);
            dispatch(getPaymentstatus(''))
          }}
          className="absolute text-zinc-700 top-2 right-2"
        >
          <IoIosClose className="text-[20px]" />
        </div>
        <div className="font-medium ">Payment Information</div>
       
          <div className={payStatus === 'success'? "font-medium text-green-600":"text-red-600 font-medium"}>{payStatus}</div>
          <div className="overflow-auto space-y-2 h-[95vw] w-full">
         {transHistory?.map((item, index) => {
          return (
            <div 
            key={index}
            className="flex pl-3 w-full border-b py-3 flex-col space-y-2 justify-start items-center">
         
            <div className="grid grid-cols-2 w-full  gap-2">
              <span>Item purchased:</span>
              <span>{item.name}</span>
            </div>
            <div className="grid grid-cols-2 w-full gap-2">
              <span>Qty purchased:</span>
              <span>{item.count}</span>
            </div>
          
            <div className="grid grid-cols-2 w-full gap-2">
              <span>Amount:</span>
              <span>{item.price}</span>
            </div>
           
            <div className="grid grid-cols-2 w-full gap-2">
              <span>Store name:</span>
              <span>{item.storeName}</span>
            </div>
            <div className="grid grid-cols-2 w-full gap-2">
              <span>Date:</span>
              <span>{`  ${day} ${month} ${year}`}</span>
            </div>
            <div className="grid grid-cols-2 w-full gap-2">
              <span>Time: </span>
              <span>{`${timeFormat(hours, minutes, seconds, amPm)}`}</span>
            </div>
            </div>
          )
         })}
          </div>
    
        
      </div>
    </div>
  );
};

export default PaymentNotification;
