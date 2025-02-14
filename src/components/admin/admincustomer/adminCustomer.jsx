import React, { useState, useEffect } from "react";
import AdminTopBar from "../dashboard/adminTopBar";
import AdminDesktopDashboard from "../dashboard/admindesktopDash";
import AdminMobileDashboard from "../dashboard/adminmobileDash";
import { getCustomers } from "firebasedatas/userInformation";
import { useNavigate } from "react-router-dom";
import loading from "../../../assets/Svg/loading.svg";
import { IoIosSearch } from "react-icons/io";
import { RequireAuth } from "Utils/RequireAuth";

const AdminCustomer = () => {
  const [myCustomers, setCustomers] = useState([]);
  const [newCustomers, setNewCustomers] = useState([]);
  const [searchText, setsearchText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const customers = [];

    async function getUsers() {
      await getCustomers(customers)
        .then((res) => {
          setCustomers(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    getUsers();
  }, []);

  useEffect(() => {
    setNewCustomers(
      myCustomers.filter((item) => {
        if (searchText.length === 0) return item;
        else return item.email.stringValue.toLowerCase().includes(searchText.toLowerCase());
      })
    );
  }, [searchText, myCustomers]);
  return (
    <RequireAuth>
      <div className="w-full h-full">
        <AdminTopBar />

        <div className="let mx-auto swipeIn py-2 mt-[55px] text-zinc-700 min-[450px]:mt-[68px] w-full sm:w-[95%] min-[1000px]:w-[80%] xl:w-[82%] pb-[5rem] sm:pb-[5rem] float-right px-2 text-">
          <div className="relative w-[100%] min-[450px]:h-9 md:h-11 rounded-3xl my-8">
            <input
              onChange={(e) => {
                setsearchText(e.target.value);
              }}
              type="text"
              name="text"
              placeholder="Search by Email"
              value={searchText}
              id="text"
              className="w-full h-full rounded-3xl px-8 outline-none"
            />
            <div className="absolute px-2 h-full flex top-0 rounded-3xl space-x-2 justify-center items-center right-0 bg-[#009999] text-white ">
              <IoIosSearch />
              <span>Search</span>
            </div>
          </div>
          <div className="grid grid-cols-5 px-2  border-zinc-700 w-full mx-auto ">
            <div className="w-full justify-center flex items-center">
              <span>Name</span>
            </div>
            <div className="w-full justify-center flex items-center">
              <span>Email</span>
            </div>
            <div className="w-full justify-center flex items-center">
              <span>Phone Number</span>
            </div>
            <div className="w-full justify-center flex items-center">
              <span className="max-[600px]:hidden">ID</span>
              <span className="bg-none min-[600px]:hidden w-2 h-2"></span>
            </div>
            <div className="w-full justify-center flex items-center">
              <span className="bg-none w-2 h-2"></span>
            </div>
          </div>

          {newCustomers.length === 0 && myCustomers.length === 0 && (
            <div className="w-full flex items-center justify-center">
              <img src={loading} alt="" />
            </div>
          )}

          {newCustomers?.map(({ name, userId, phone, email }, idx) => {
            return (
              <div
                key={idx}
                className="grid grid-cols-4  py-8 px-2 border-b border-zinc-400 w-full items-center mx-auto b cursor-pointer"
                onClick={() => {
                  navigate(`/admin/userdetail/${userId.stringValue}`);
                }}>
                <div className="flex space-x-2 items-center justify-start max-[600px]:col-span-2">
                  <span>{idx + 1}</span>
                  <span className="truncate w-[98vw] text-zinc-700 sm:pr-[10%] flex flex-wrap overflow-hidden">
                    <span className="text-ellipsis whitespace-nowrap overflow-hidden w-[190px] min-[450px]:w-[190px]">{name.stringValue}</span>
                  </span>
                </div>
                <div className="flex space-x-2 items-center justify-start max-[600px]:col-span-2">
                  <span className="truncate w-[98vw] text-zinc-700 sm:pr-[10%] flex flex-wrap overflow-hidden">
                    <span className="text-ellipsis whitespace-nowrap overflow-hidden w-[190px] min-[450px]:w-[190px]">{email.stringValue}</span>
                  </span>
                </div>
                <div className="flex space-x-2 items-center justify-start max-[600px]:col-span-2">
                  <span className="truncate w-[98vw] text-zinc-700 sm:pr-[10%] flex flex-wrap overflow-hidden">
                    <span className="text-ellipsis whitespace-nowrap overflow-hidden w-[190px] min-[450px]:w-[190px]">{phone?.stringValue}</span>
                  </span>
                </div>
                <div className="max-[600px]:hidden">{userId.stringValue}</div>

                {/* <div className="w-full flex justify-end">
                <button
                  onClick={() => {
                    navigate(`/admin/userdetail/${userId.stringValue}`);
                  }}
                  className=" flex justify-center items-center w-fit p-2 rounded-md bg-[#009999] bg-opacity-25 text-[#009999]">
                  View Detail
                </button>
              </div> */}
              </div>
            );
          })}
        </div>

        <AdminDesktopDashboard />
        <AdminMobileDashboard />
      </div>
    </RequireAuth>
  );
};

export default AdminCustomer;
