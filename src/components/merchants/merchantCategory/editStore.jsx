import React, { useEffect, useState } from "react";
import TopNavBar from "../topnavbar";
import DesktopDashNav from "../dashboard/desktopNav/desktopdashnav";
import EditCategories from "./editCats";
import MobileDashboard from "../dashboard/mobiledashnav";
import { useSelector, useDispatch } from "react-redux";
import { getExistingDoc } from "firebasedatas/firebaseAuth";
import { useLocation } from "react-router-dom";
import { updateCategory } from "Redux/Actions/ActionCreators";
import { getCategory } from "firebasedatas/getProducts";

const EditStore = () => {
  const { state } = useLocation();
  const [merchant, setMerchant] = useState();
  const [key, setKey] = useState()
  const [merchantId, setmerchantId] = useState();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { data, cats } = state;
  useEffect(() => {
    async function getUser() {
      await getExistingDoc(currentUser)
        .then((res) => {
          console.log(res);
          setMerchant(res.store);
          setmerchantId(res.userId);
          setKey(res.key);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    getUser();
  }, []);

  

  useEffect(() => {
    const health = [];
    const phone = [];
    const laptop = [];
    const estate = [];
    const pharmacy = [];
    const drink = [];
    const foodstuff = [];
    const fashion = [];
    const automobile = [];
    const appliance = [];
    const baby = [];
   // const data = [];
    async function getData() {
      await getCategory(
        health,
        phone,
        laptop,
        estate,
        pharmacy,
        drink,
        foodstuff,
        fashion,
        automobile,
        appliance,
        baby
      )
        .then((res) => {
          console.log(res);
          dispatch(updateCategory(res));
        })
        .catch((err) => {
          console.log(err);
        });
    }
    getData();
  }, []);

  return (
    <div className="w-full h-full  bg-gray-200 inset-0 sm:pb-56 fixed overflow-y-auto overflow-x-hidden">
      <TopNavBar merchant={merchant} />
      <DesktopDashNav key={key} />
      <EditCategories cats={cats} data={data} uid={merchantId}/>
  
      <MobileDashboard key={key} />
    </div>
  );
};

export default EditStore;
