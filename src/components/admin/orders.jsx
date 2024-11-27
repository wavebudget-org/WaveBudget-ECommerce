import React, { useEffect, useState } from "react";
import AdminDesktopDashboard from "./dashboard/admindesktopDash";
import AdminMobileDashboard from "./dashboard/adminmobileDash";
import AdminTopBar from "./dashboard/adminTopBar";
import { getOrders } from "firebasedatas/getPurchased";
import { formatter } from "Utils/helpers";
import { useNavigate } from "react-router-dom";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function getItems() {
      await getOrders()
        .then((res) => {
          setOrders(res);
        })
        .catch((er) => {
          console.log(er);
        });
    }
    getItems();
  }, []);
  return (
    <div className="w-full h-full">
      <AdminTopBar />
      <div className="let mx-auto swipeIn mt-[35px] text-zinc-700 min-[450px]:mt-[65px] w-full sm:w-[95%] min-[1000px]:w-[80%] xl:w-[83%] pb-[5rem] sm:pb-[5rem] space-y-[5%] float-right p-6 text-">
        <div className="assignContainer">
          <div className="assignWrapper">
            <div className="assignHeader">
              <p>ID</p>
              <p>Customer</p>
              <p>Status</p>
              <p>Date</p>
              <p>Total</p>
            </div>
            {orders.length === 0 ? (
              <p>No Data</p>
            ) : (
              orders?.map((item, index) => {
                let temp = item.cart.map((value) => value.curPrice);
                let price = temp.reduce((acc, item) => Number(acc) + Number(item), 0);
                return (
                  <div className="assignSingle" key={index} onClick={() => navigate(`/admin/orders/${item.id}`)}>
                    <p>{item.id}</p>
                    <p>{item.customerName}</p>
                    <p className={item.status === "completed" ? "completed" : item.status === "failed" || item.status === "cancelled" ? "failed" : "ongoing"}>{item.status}</p>
                    <p>{item.date}</p>
                    <p>{formatter.format(price)}</p>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
      <AdminDesktopDashboard />
      <AdminMobileDashboard />
    </div>
  );
};

export default AdminOrders;
