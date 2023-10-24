import GroupHeaders from "components/groupHeadings/groupHeaders";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { getPurchased } from "firebasedatas/getPurchased";

import HidHeader from "components/Landing/minors/headers/hidHeader";
import VisHeader from "components/Landing/minors/headers/vHeader";
const UserHistory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [myHistory, setmyHistory] = useState([]);

  useEffect(() => {
    const singleItem = [];
    const multipleItems = [];

    if (!id) return;
    async function getItems() {
      await getPurchased(singleItem, multipleItems)
        .then((res) => {
          console.log(res);
          const { singleItem, multipleItems } = res;
          const sortArray = singleItem.concat(multipleItems);

          setmyHistory(
            sortArray.sort(function (a, b) {
              return a.createdAt - b.createdAt;
            })
          );
        })
        .catch((er) => {
          console.log(er);
        });
    }
    getItems();
  }, []);

  return (
    <div className="w-full h-full">
      <VisHeader/>
      <GroupHeaders headings={"Transaction History"} />
      <div className="max-[450px]:hidden mt-[10px] px-3 text-zinc-700 font-medium text-lg grid grid-cols-3 items-center w-full ">
        <AiOutlineArrowLeft
          onClick={() => {
            navigate(-1);
          }}
          className="text-[23px]"
        />
        <span>Transaction History</span>
        <span className="bg-none h-2 w-2"></span>
      </div>
   
      <div className=" max-[450px]:mt-[57px] max-[450px]:pt-[35px] w-full">
           {(myHistory.length === 0 ||
        myHistory.filter((val) => val.userId?.stringValue === id).length ===
          0) && (
        <div className="flex w-full h-[20vw] text-zinc-700 justify-center items-center">
          <span>--No order history--</span>
        </div>
      )}

      <div className=" grid px-3 grid-cols-1 w-full  text-zinc-700 items-center sm:grid-cols-2 gap-2">
        {myHistory
          ?.filter((val) => val.userId?.stringValue === id)
          ?.map(
            (
              { curPrice, date, time, name, price, status, count, storeName },
              idx
            ) => {
              return (
                <div
                  key={idx}
                  className="w-full bg-white  p-3 my-3 space-x-3 justify-start"
                >
                  <div className="w-full min-[450px]:w-[350px] space-y-2 min-[450px]:space-y-3">
                    <div className="grid grid-cols-2 items-center w-full gap-2">
                      <span className="font-medium">{time?.stringValue}</span>
                    </div>
                    <div className="grid grid-cols-2 items-center w-full  gap-2">
                      <span>Item Purchased:</span>
                      <span className="font-medium">{name?.stringValue}</span>
                    </div>

                    <div className="grid grid-cols-2 items-center w-full gap-2">
                      <span>Price:</span>
                      <span className="font-medium">{` ₦${
                        curPrice?.integerValue || price?.integerValue
                      }`}</span>
                    </div>
                    <div className="grid grid-cols-2 items-center w-full gap-2">
                      <span>Qty purchased:</span>
                      <span className="font-medium">{count?.integerValue}</span>
                    </div>
                    <div className="grid grid-cols-2 items-center w-full gap-2">
                      <span>Store Name:</span>
                      <span className="font-medium">
                        {storeName?.stringValue}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 items-center w-full gap-2">
                      <span>Payment Status:</span>
                      <span className="font-medium">{status?.stringValue}</span>
                    </div>
                    <div className="grid grid-cols-2 items-center w-full gap-2">
                      <span>Date:</span>
                      <span className="font-medium">{date?.stringValue}</span>
                    </div>
                  </div>
                </div>
              );
            }
          )}
      </div>

      </div>

     
    </div>
  );
};

export default UserHistory;
