import React, { useEffect, useState } from "react";
import AdminDesktopDashboard from "../dashboard/admindesktopDash";
import AdminMobileDashboard from "../dashboard/adminmobileDash";
import AdminTopBar from "../dashboard/adminTopBar";
import { getCustomers, getMerchant } from "firebasedatas/userInformation";
import { getOrders } from "firebasedatas/getPurchased";
import { RequireAuth } from "Utils/RequireAuth";

const AdminHome = () => {
  const [noOfCustomers, setnoOfCustomers] = useState();
  const [noOfSellers, setnoOfSellers] = useState();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const customers = [];
    const sellers = [];
    async function getItems() {
      await getOrders()
        .then((res) => {
          console.log(res);
          setOrders(res);
        })
        .catch((er) => {
          console.log(er);
        });
    }
    getItems();
    async function getUsers() {
      await getCustomers(customers)
        .then((res) => {
          setnoOfCustomers(res.length);
        })
        .catch((err) => {
          console.log(err);
        });

      await getMerchant(sellers)
        .then((res) => {
          setnoOfSellers(res.length);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    getUsers();
  }, []);

  return (
    <RequireAuth>
      <div className="w-full h-full">
        <AdminTopBar />
        <div className="let mx-auto swipeIn mt-[35px] text-zinc-700 min-[450px]:mt-[65px] w-full sm:w-[95%] min-[1000px]:w-[80%] xl:w-[83%] pb-[5rem] sm:pb-[5rem] space-y-[5%] float-right p-6 text-">
          <div className="mx-auto grid grid-cols-1 w-full min-[450px]:grid-cols-2 gap-3 md:grid-cols-3">
            <div className="min-[450px]:h-[250px] h-[150px] overflow-hidden text-white bg-teal-900  shadow-lg p-3 flex flex-col space-y-3 items-center justify-center max-[450px]:rounded-lg rounded-xl">
              <div className="text-5xl">{noOfCustomers || 0}</div>
              <div className="">Number of Customers </div>
            </div>
            <div className="min-[450px]:h-[250px] h-[150px] overflow-hidden text-white  shadow-lg bg-teal-900 p-3 flex flex-col space-y-3 items-center justify-center max-[450px]:rounded-lg rounded-xl">
              <div className="text-5xl">{noOfSellers || 0}</div>
              <div className="">Number of Merchants </div>
            </div>
            <div className="min-[450px]:h-[250px] h-[150px] overflow-hidden text-white  shadow-lg bg-teal-900 p-3 flex flex-col space-y-3 items-center justify-center max-[450px]:rounded-lg rounded-xl">
              <div className="text-5xl">
                {orders?.filter((item) => {
                  return item.status === "completed";
                }).length || 0}
              </div>
              <div className="">Successful Orders </div>
            </div>
            <div className="min-[450px]:h-[250px] h-[150px] overflow-hidden text-white  shadow-lg bg-teal-900 p-3 flex flex-col space-y-3 items-center justify-center max-[450px]:rounded-lg rounded-xl">
              <div className="text-5xl">
                {orders?.filter((item) => {
                  return item.status === "Processing";
                }).length || 0}
              </div>
              <div className="">Processing Orders </div>
            </div>
            <div className="min-[450px]:h-[250px] h-[150px] overflow-hidden text-white  shadow-lg bg-teal-900 p-3 flex flex-col space-y-3 items-center justify-center max-[450px]:rounded-lg rounded-xl">
              <div className="text-5xl">
                {orders?.filter((item) => {
                  return item.status === "failed" || item.status === "cancelled";
                }).length || 0}
              </div>
              <div className="">Failed Orders </div>
            </div>
          </div>
        </div>
        <AdminDesktopDashboard />
        <AdminMobileDashboard />
      </div>
    </RequireAuth>
  );
};

export default AdminHome;
