import React, { useEffect, useState } from "react";
import DesktopDashNav from "./dashboard/desktopNav/desktopdashnav";
import AddProduct from "./addproduct/addProduct";
import MobileDashboard from "./dashboard/mobiledashnav";
import TopNavBar from "./topnavbar";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getExistingDoc } from "firebasedatas/firebaseAuth";

const AddToStore = () => {
  const { id } = useParams();
  const [merchant, setMerchant] = useState();
  const [merchantId, setmerchantId] = useState();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    async function getUser() {
      await getExistingDoc(currentUser)
        .then((res) => {
          setMerchant(res.store);
          setmerchantId(res.userId);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    getUser();
  }, [currentUser]);

  return (
    <div className="w-full h-full  bg-gray-50 inset-0 sm:pb-32 fixed overflow-y-auto overflow-x-hidden">
      <TopNavBar merchant={merchant} />
      <DesktopDashNav />
      <AddProduct merchant={merchant} uid={merchantId} key={id} />
      <MobileDashboard />
    </div>
  );
};

export default AddToStore;
