import React, { useEffect, useState } from "react";
import TopNavBar from "./topnavbar";
import { useSelector } from "react-redux";
import { getExistingDoc } from "firebasedatas/firebaseAuth";
import DesktopDashNav from "./dashboard/desktopNav/desktopdashnav";
import MobileDashboard from "./dashboard/mobiledashnav";
import { getOrders } from "firebasedatas/getPurchased";
import { formatter } from "Utils/helpers";
import { useNavigate } from "react-router-dom";
import "../../../src/styles.css";

const MerchantOrders = () => {
  const [merchant, setMerchant] = useState();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  const [orders, setOrders] = useState([]);

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

  useEffect(() => {
    async function getUser() {
      await getExistingDoc(currentUser)
        .then((res) => {
          setMerchant(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    getUser();
  }, [currentUser]);
  return (
    <div className="w-full h-full  bg-gray-50 inset-0 sm:pb-32 fixed overflow-y-auto overflow-x-hidden">
      <TopNavBar merchant={merchant?.store} />
      <DesktopDashNav />
      <div className="let swipeIn mt-[40px] text-zinc-700 min-[450px]:mt-[60px] w-full sm:w-[95%] min-[1000px]:w-[80%] xl:w-[83%] pb-[5rem] sm:pb-[5rem] space-y-[5%] float-right p-6 text-">
        <div className="assignContainer">
          <div className="assignWrapper">
            <div className="assignHeader">
              <p>ID</p>
              <p>Customer</p>
              <p>Product Name</p>
              <p>Date</p>
              <p>Total</p>
            </div>
            {orders.length === 0 ? (
              <p>No Data</p>
            ) : (
              orders?.map((item) => {
                return item.cart?.map((items, index) => {
                  if (items.id === merchant.userId) {
                    return (
                      <div className="assignSingle" key={index} onClick={() => navigate(`/seller/orders/${item.id}`)}>
                        <p>{item.id}</p>
                        <p>{item.customerName}</p>
                        <p>{items.name}</p>
                        <p>{item.date}</p>
                        <p>{formatter.format(items.curPrice)}</p>
                      </div>
                    );
                  }
                  return true;
                });
              })
            )}
          </div>
        </div>
      </div>
      <MobileDashboard />
    </div>
  );
};

export default MerchantOrders;
