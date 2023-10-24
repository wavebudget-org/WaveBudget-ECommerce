import React, { useState, useEffect } from "react";
import AdminTopBar from "../dashboard/adminTopBar";
import AdminDesktopDashboard from "../dashboard/admindesktopDash";
import AdminMobileDashboard from "../dashboard/adminmobileDash";
import detail from "../../../assets/images/detail.jpg";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import newimage from "../../../assets/images/new.png";
import { getExistingDoc } from "firebasedatas/firebaseAuth";
import { getPurchased } from "firebasedatas/getPurchased";
const UserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [myHistory, setmyHistory] = useState([]);

  useEffect(() => {
    if (!id) return;
    async function getUser() {
      await getExistingDoc(id)
        .then((res) => {
          console.log(res);
          setData(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    getUser();
  }, []);

  useEffect(() => {
    const singleItem = [];
    const multipleItems = [];

    if (!id) return;
    async function getItems() {
      await getPurchased(singleItem, multipleItems)
        .then((res) => {
          console.log(res);
          const { singleItem, multipleItems } = res;
          const sortArray = singleItem.concat(multipleItems)
          
          setmyHistory(sortArray.sort(function(a,b) {
            return a.createdAt - b.createdAt
          }));
        })
        .catch((er) => {
          console.log(er);
        });
    }
    getItems();
  }, []);

  return (
    <div className="w-full h-full bg-gray-100">
      <AdminTopBar />
      <div className="let mx-auto swipeIn py-2 mt-[55px] text-zinc-700 min-[450px]:mt-[65px] w-full sm:w-[96%] min-[1000px]:w-[80%] xl:w-[84%] pb-[5rem] sm:pb-[5rem] float-right px-2 text-">
        <div className="relative w-full h-[100px] min-[450px]:h-[150px]">
          <div
            onClick={() => {
              navigate(-1);
            }}
            className="absolute z-50 cursor-pointer top-3 left-3 text-[20px] min-[450px]:text-[30px] text-teal-100 "
          >
            <AiOutlineArrowLeft />
          </div>
          <img className="h-full w-full object-cover" src={detail} alt="" />
          <div className="w-full h-full absolute inset-0 ">
            <div className="pl-12 max-[450px]:pl-8 flex  items-center space-x-2 h-full text-teal-100 text-lg min-[450px]:text-lg ">
              <div className="w-[80px] h-[80px] max-[450px]:w-[50px] max-[450px]:h-[50px]">
                <img
                  src={newimage}
                  alt=""
                  className="w-full h-full"
                />
              </div>
              <div className="flex flex-col ">
                <div className="flex space-x-2 max-[450px]:space-x-1 items-center w-full">
                  <span>Name:</span>
                  <span>{data?.name}</span>
                </div>
                <div className="flex space-x-2 max-[450px]:space-x-1 items-center w-full ">
                  <span>Email:</span>
                  <span>{data?.email}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex p-3 space-x-2 items-center">
          <span className="text-[#009999] font-medium">Order history</span>
        </div>
        {(myHistory.length === 0 ||
          myHistory.filter((val) => val.userId?.stringValue === id).length ===
            0) && (
          <div className="flex w-full h-[20vw] justify-center items-center">
            <span>--No order history--</span>
          </div>
        )}
        <div className="grid grid-cols-1 w-full items-center sm:grid-cols-2 gap-2">
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
                        <span className="font-medium">
                          {count?.integerValue}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 items-center w-full gap-2">
                        <span>Store Name:</span>
                        <span className="font-medium">
                          {storeName?.stringValue}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 items-center w-full gap-2">
                        <span>Payment Status:</span>
                        <span className="font-medium">
                          {status?.stringValue}
                        </span>
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

      <AdminDesktopDashboard />
      <AdminMobileDashboard />
    </div>
  );
};

export default UserDetail;
