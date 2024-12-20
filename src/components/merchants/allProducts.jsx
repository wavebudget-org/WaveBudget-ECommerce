/* eslint-disable array-callback-return */
import React, { useEffect, useState } from "react";
import TopNavBar from "./topnavbar";
import { useSelector } from "react-redux";
import { getExistingDoc } from "firebasedatas/firebaseAuth";
import DesktopDashNav from "./dashboard/desktopNav/desktopdashnav";
import MobileDashboard from "./dashboard/mobiledashnav";
import { formatter } from "Utils/helpers";
import "../../../src/styles.css";
import { getAll } from "firebasedatas/getProducts";
import { useNavigate } from "react-router-dom";

const MerchantProducts = () => {
  const [merchant, setMerchant] = useState();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const data = [];
    async function getItems() {
      await getAll(data)
        .then((res) => {
          console.log(res);
          setProducts(res);
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
              <p>Product Name</p>
              <p>Category</p>
              <p>Quantity</p>
              <p>Price</p>
            </div>
            {products.length === 0 ? (
              <p>No Data</p>
            ) : (
              products?.map((item, index) => {
                if (item.merchantId === merchant.userId) {
                  return (
                    <div className="assignSingle" key={index} onClick={() => navigate(`/seller/store/${item.id}`)}>
                      <p>{item.id}</p>
                      <p>{item.name}</p>
                      <p>{item.category}</p>
                      <p>{item.qty}</p>
                      <p>{formatter.format(item.price)}</p>
                    </div>
                  );
                }
              })
            )}
          </div>
        </div>
      </div>
      <MobileDashboard />
    </div>
  );
};

export default MerchantProducts;
