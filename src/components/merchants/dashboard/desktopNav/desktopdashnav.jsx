import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./desktopdashnav.scss";
import { AiOutlineMenu } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RiArrowDropDownFill } from "react-icons/ri";
import { updateSingleItem } from "Redux/Actions/ActionCreators";
import { getExistingDoc } from "firebasedatas/firebaseAuth";
const DesktopDashNav = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { category } = useSelector((state) => state.items);
  const navigate = useNavigate();
  const [isOpen, setisOpen] = useState(false);
  const [ischeck, setischeck] = useState(false);
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const [key, setKey] = useState();

  useEffect(() => {
    async function getUser() {
      await getExistingDoc(currentUser)
        .then((res) => {
          setKey(res.key);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    getUser();
  }, [currentUser]);

  const data = [
    { cats: "Health & Beauty", data: category?.health, id: "health" },
    { cats: "Phones", data: category?.phone, id: "phone" },
    { cats: "Laptops", data: category?.laptop, id: "laptop" },
    { cats: "Real Estate", data: category?.estate, id: "estate" },
    { cats: "Pharmaceutical", data: category?.pharmacy, id: "pharmacy" },
    { cats: "Drinks & Beverages", data: category?.drink, id: "drink" },
    { cats: "FoodStuffs", data: category?.foodstuff, id: "foodstuff" },
    { cats: "Fashion", data: category?.fashion, id: "fashion" },
    { cats: "Automobile", data: category?.automobile, id: "automobile" },
    { cats: "Appliances", data: category?.appliance, id: "appliance" },
    { cats: "Baby Products", data: category?.baby, id: "baby" },
  ];

  const setOpen = (e) => {
    e.stopPropagation();
    setisOpen(!isOpen);
  };
  const checkcat = () => {
    setischeck(!ischeck);
  };
  return (
    <div
      onClick={(e) => {
        setOpen(e);
      }}
      className={isOpen ? "wrapper let swipeInLeft fixed z-20 cursor-pointer hs h-full" : "fixed cursor-pointer hs h-full z-20 nowrapper  let swipeInLeft"}>
      <div className={isOpen ? "menuhide let swipeInLeft p-1 sm:p-2" : "p-1 sm:p-2 menu let swipeInLeft"}>
        <div
          onClick={(e) => {
            setOpen(e);
          }}>
          <AiOutlineMenu className="text-[25px] text-white" />
        </div>
      </div>

      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={isOpen ? "dashhideshow let swipeInLeft px-2  sm:px-4 h-full" : "dashshow let swipeInLeft px-2  sm:px-4 h-full"}>
        <div className="uppercase font-bold text-white mb-3">Dashboard</div>
        <div className="bg-none h-2 mb-3 w-2"></div>
        <Link
          to={`/seller/home`}
          className={`hover:text-white hover:font-normal  ${pathname === `/seller/home` ? "font-medium text-gray-200" : "font-light text-gray-200"}
          `}>
          Home
        </Link>
        <div className="bg-none h-2 w-2"></div>
        <Link
          to={`/seller/store/${key}`}
          className={`hover:text-white hover:font-normal  ${pathname === `/seller/store/${key}` ? "font-medium text-gray-200" : "font-light text-gray-200"}
          `}>
          Add product
        </Link>
        <div className="my-3">
          <div
            onClick={checkcat}
            className={`${pathname === "/seller/edit-item" ? "font-normal" : "font-light"} text-gray-200 hover:text-white mb-3 hover:font-normal flex items-center space-x-1`}>
            <span>Edit Categories </span>
            <RiArrowDropDownFill className={ischeck ? "text-[20px] rotate-[180deg]" : "text-[20px]"} />
          </div>
          {ischeck && (
            <div className="space-y-3 pl-3 $text-gray-200 text-sm">
              {data.map(({ cats, data, id }, idx) => {
                return (
                  <div
                    key={idx}
                    onClick={() => {
                      navigate("/seller/edit-item", {
                        state: {
                          cats,
                        },
                      });
                      dispatch(updateSingleItem(data));
                    }}>
                    <span className={`${pathname === "/seller/edit-item" ? "font-normal" : "font-light"} hover:text-white hover:font-normal text-gray-200`}>{cats}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <Link
          to={`/seller/orders`}
          className={`hover:text-white hover:font-normal  ${pathname === `/seller/orders` ? "font-medium text-gray-200" : "font-light text-gray-200"}
          `}>
          Orders
        </Link>
        <div className="bg-none h-2 w-2"></div>
        <Link
          to={`/seller/userinfo`}
          className={`hover:text-white hover:font-normal  ${pathname === `/seller/userinfo` ? "font-medium text-gray-200" : "font-light text-gray-200"}
          `}>
          My wave
        </Link>
      </div>
    </div>
  );
};

export default DesktopDashNav;
