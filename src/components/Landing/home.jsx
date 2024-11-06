import React, { useState, useEffect } from "react";

import Header from "./minors/headers/header";
import Search from "./minors/search";
import GroupWidget from "./minors/groupWidget/groupsWidget";
import MobileCards from "./minors/mobilecards";
import ProductWidget from "./minors/productWidget";
import WaveFooter from "./minors/footer/footer";
import MobileNav from "components/mobilenav/mobileNav";
import HidHeader from "./minors/headers/hidHeader";
import ItemCategories from "./minors/categories/itemCategories";
import MobileCategories from "./minors/categories/mobileCategories";
import { useDispatch, useSelector } from "react-redux";
import { getAll } from "firebasedatas/getProducts";
import MobileSearch from "./minors/headers/mobsearch";
const HomePage = () => {
  const { items } = useSelector((state) => state.items);
  const [newArrival, setNewarrival] = useState();
  const [isVisible, setIsVisible] = useState(false);
  const dispatch = useDispatch();
  const [product, setProduct] = useState();

  useEffect(() => {
    const data = [];
    async function getData() {
      await getAll(data)
        .then((res) => {
          const currentTime = new Date().getTime();
          setProduct(res);
          const filter = res?.filter((val) => val.createdAt?.integerValue > currentTime - 604800000);
          const arr = filter.sort(function (a, b) {
            return a.createdAt - b.createdAt;
          });
          setNewarrival(arr);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    getData();
  }, [dispatch]);

  useEffect(() => {
    const currentTime = new Date().getTime();
    if (items) {
      const filter = items?.filter((val) => val.createdAt?.integerValue > currentTime - 604800000);
      const arr = filter.sort(function (a, b) {
        return a.createdAt - b.createdAt;
      });
      setNewarrival(arr);
    }
  }, [items]);

  return (
    <div className="w-full h-full pb-[40px] min-[450px]:pb-0 overflow-y-auto">
      <Header />
      <HidHeader isVisibles={isVisible} />
      <MobileSearch />
      <MobileCards />
      <Search isVisibles={isVisible} setIsVisible={setIsVisible} />

      <div className="mx-auto mb-[1rem] sm:p-0 p-2 w-full min-[450px]:w-[97vw] lg:w-[88vw]">
        <ItemCategories />
        <MobileCategories />
        <GroupWidget heading={"Best Selling"} />
        <GroupWidget heading={"New Arrivals"} payload={newArrival} />
        <ProductWidget items={product} />
      </div>

      <WaveFooter />

      <MobileNav />
    </div>
  );
};

export default HomePage;
