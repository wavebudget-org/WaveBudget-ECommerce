import React, { useEffect, useState } from "react";
import { BsPhone, BsLaptop } from "react-icons/bs";
import { MdOutlineRealEstateAgent, MdOutlineLocalPharmacy, MdOutlineFoodBank, MdOutlineEmojiFoodBeverage } from "react-icons/md";
import { TbBabyCarriage } from "react-icons/tb";
import healths from "../../../../assets/Svg/health.svg";
import autos from "../../../../assets/Svg/auto.svg";
import fashions from "../../../../assets/Svg/fashion.svg";
import appliances from "../../../../assets/Svg/appliances.svg";
import { useNavigate } from "react-router-dom";
import "react-slideshow-image/dist/styles.css";
import { Slide } from "react-slideshow-image";

import { SliderText } from "./slidertext";
import { getBanner } from "firebasedatas/getProducts";
const ItemCategories = () => {
  const navigate = useNavigate();

  const [images, setImages] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const res = await getBanner();
        if (!res?.values) return; // Handle unexpected response structure

        const data = res.values.map((doc) => {
          const { fields } = doc.mapValue;
          return {
            id: fields.id.stringValue,
            url: fields.url.stringValue,
            title: <SliderText />,
          };
        });

        setImages(data);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    }

    getData();
  }, []);

  return (
    <div className="max-[1000px]:hidden gap-6 grid grid-cols-6 bg-white rounded-md p-4">
      <div className="w-fit text-[14px] col-span-1 space-y-4 cursor-pointer">
        <div
          onClick={() => {
            navigate("/detail", {
              state: {
                navtitle: "Health and Beauty",
              },
            });
          }}
          className="flex group space-x-2 justify-start items-center">
          <div className="w-[20px] h-[20px]">
            <img className="w-full h-full" src={healths} alt="" />
          </div>
          <span className=" group-hover:text-[#009999] capitalize">Health and Beauty</span>
        </div>

        <div
          onClick={() => {
            navigate("/detail", {
              state: {
                navtitle: "Phones",
              },
            });
          }}
          className="flex group space-x-2 justify-start items-center">
          <BsPhone className="text-[20px] group-hover:text-[#009999]" />
          <span className="capitalize  group-hover:text-[#009999]">Phones</span>
        </div>
        <div
          onClick={() => {
            navigate("/detail", {
              state: {
                navtitle: "Laptops",
              },
            });
          }}
          className="flex  space-x-2 group justify-start items-center">
          <BsLaptop className="text-[20px]  group-hover:text-[#009999]" />
          <span className="capitalize  group-hover:text-[#009999]">Laptops</span>
        </div>
        <div
          onClick={() => {
            navigate("/detail", {
              state: {
                navtitle: "Real Estate",
              },
            });
          }}
          className="flex group space-x-2 justify-start items-center">
          <MdOutlineRealEstateAgent className="text-[20px]  group-hover:text-[#009999]" />
          <span className="capitalize  group-hover:text-[#009999]">Real Estate</span>
        </div>
        <div
          onClick={() => {
            navigate("/detail", {
              state: {
                navtitle: "Pharmaceuticals",
              },
            });
          }}
          className="flex  space-x-2 group justify-start items-center">
          <MdOutlineLocalPharmacy className="text-[20px]  group-hover:text-[#009999]" />
          <span className="capitalize  group-hover:text-[#009999]">Pharmaceuticals</span>
        </div>
        <div
          onClick={() => {
            navigate("/detail", {
              state: {
                navtitle: "Drinks and Beverages",
              },
            });
          }}
          className="flex  space-x-2 group justify-start items-center">
          <MdOutlineEmojiFoodBeverage className="text-[20px]  group-hover:text-[#009999]" />
          <span className="capitalize  group-hover:text-[#009999]">Drinks and Beverages</span>
        </div>
        <div
          onClick={() => {
            navigate("/detail", {
              state: {
                navtitle: "FoodStuffs",
              },
            });
          }}
          className="flex group  space-x-2 justify-start items-center">
          <MdOutlineFoodBank className="text-[20px]  group-hover:text-[#009999]" />
          <span className="capitalize  group-hover:text-[#009999]">Food Stuffs</span>
        </div>
        <div
          onClick={() => {
            navigate("/detail", {
              state: {
                navtitle: "Fashion",
              },
            });
          }}
          className="flex group space-x-2 justify-start items-center">
          <div className="w-[20px] h-[20px]">
            <img src={fashions} alt="" />
          </div>
          <span className="capitalize  group-hover:text-[#009999]">Fashion</span>
        </div>
        <div
          onClick={() => {
            navigate("/detail", {
              state: {
                navtitle: "Automobile",
              },
            });
          }}
          className="flex group space-x-2 justify-start items-center">
          <div className="w-[20px] h-[20px]">
            <img src={autos} alt="" />
          </div>
          <span className=" group-hover:text-[#009999] capitalize">Automobile</span>
        </div>
        <div
          onClick={() => {
            navigate("/detail", {
              state: {
                navtitle: "Appliances",
              },
            });
          }}
          className="flex group  space-x-2 justify-start items-center">
          <div className="w-[20px] h-[20px]">
            <img className="w-full h-full" src={appliances} alt="" />
          </div>
          <span className="capitalize  group-hover:text-[#009999]">Appliances</span>
        </div>
        <div
          onClick={() => {
            navigate("/detail", {
              state: {
                navtitle: "Baby Products",
              },
            });
          }}
          className="flex group  space-x-2 justify-start items-center">
          <TbBabyCarriage className="text-[20px]  group-hover:text-[#009999]" />
          <span className="capitalize  group-hover:text-[#009999]">Baby Products</span>
        </div>
      </div>

      <div className="bg-[#009999] bg-opacity-25 overflow-hidden mix-blend-multiply w-full h-full col-span-5 rounded-md">
        <Slide key={images.length}>
          {images.map((slideImage, index) => (
            <div key={index} className="w-full h-[500px]">
              <img src={slideImage.url} alt="Product" className="w-full h-full " />
              {/* <div style={{ ...divStyle, backgroundImage: `url(${slideImage.image})` }}></div> */}
            </div>
          ))}
        </Slide>
      </div>
    </div>
  );
};

export default ItemCategories;
