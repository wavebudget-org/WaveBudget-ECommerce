import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GrFormClose } from "react-icons/gr";
import { updateSingleItem } from "Redux/Actions/ActionCreators";
const CategoryNav = ({ ismobile, setismobile }) => {
  const { category } = useSelector((state) => state.items);
  const navigate = useNavigate();
  const dispatch = useDispatch()

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
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        setismobile(!ismobile);
      }}
      className={
        ismobile
          ? "let min-[450px]:hidden swipeInLeft z-50 fixed bg-black bg-opacity-60 w-full h-full inset-0"
          : "hidden"
      }
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="relative bg-white p-6 space-y-5 text-sm text-zinc-800 h-full w-fit"
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
            setismobile(!ismobile);
          }}
          className="absolute top-3 left-2"
        >
          <GrFormClose className="text-[20px] text-zinc-800" />
        </div>
        <p className="text-zinc-700 font-semibold">Categories</p>
        {data?.map(({ cats, data }, idx) => {
          return (
            <div
              onClick={() => {
                navigate("/seller/edit-item", {
                  state: {
                    cats,
                  },
                });
                setismobile(false);
                dispatch(updateSingleItem(data))
                
              }}
              key={idx}
            >
              <span className="font-normal">{cats}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryNav;
