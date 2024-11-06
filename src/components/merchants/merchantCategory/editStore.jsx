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

  const [key, setKey] = useState({});
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { cats } = state;
  const [data, setData] = useState([]);
  useEffect(() => {
    async function getUser() {
      await getExistingDoc(currentUser)
        .then((res) => {
          setKey(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    getUser();
  }, [currentUser]);

  useEffect(() => {
    async function getData() {
      await getCategory(cats)
        .then((res) => {
          // eslint-disable-next-line react-hooks/exhaustive-deps
          setData(res);
          dispatch(updateCategory(res));
        })
        .catch((err) => {
          console.log(err);
        });
    }
    getData();
  }, [dispatch, cats]);

  return (
    <div className="w-full h-full  bg-gray-200 inset-0 sm:pb-56 fixed overflow-y-auto overflow-x-hidden">
      <TopNavBar merchant={key.store} />
      <DesktopDashNav />
      <EditCategories cats={cats} data={data} uid={key} />
      <MobileDashboard />
    </div>
  );
};

export default EditStore;
