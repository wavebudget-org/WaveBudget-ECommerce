import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./mobileCategories.scss";
import appliances from "../../../../assets/images/app.jpg";
import foodss from "../../../../assets/images/foodstuffs.jpg";
import healths from "../../../../assets/images/health.jpg";
import laptops from "../../../../assets/images/lap.jpg";
import back from "../../../../assets/Svg/back.svg"
import foward from "../../../../assets/Svg/foward.svg"
import fashions from "../../../../assets/images/fashion.jpg";
import phoness from "../../../../assets/images/phones.png";
import estates from "../../../../assets/images/estate.jpg";
import drinks from "../../../../assets/images/drink.png";
import babys from "../../../../assets/images/baby.jpg";
import pharms from "../../../../assets/images/pharm.jpg";
import autos from "../../../../assets/images/autom.jpg";
import { useSelector } from "react-redux";
const MobileCategories = () => {
  const navigate = useNavigate();
  const slide = useRef();
  const [isnext, setisnext] = useState(true);
  const [isprev, setisprev] = useState(false);
  const {category} = useSelector((state) => state.items)



  const data = [
    { cats: "Health & Beauty", img: healths, data:category?.health },
    { cats: "Phones", img: phoness, data:category?.phone },
    { cats: "Laptops", img: laptops, data:category?.laptop },
    { cats: "Real Estate", img: estates, data:category?.estate },
    { cats: "Pharmaceutical", img: pharms, data:category?.pharmacy },
    { cats: "Drinks & Beverages", img: drinks, data:category?.drink },
    { cats: "FoodStuffs", img: foodss, data:category?.foodstuff },
    { cats: "Fashion", img: fashions, data:category?.fashion },
    { cats: "Automobile", img: autos, data:category?.automobile },
    { cats: "Appliances", img: appliances, data:category?.appliance },
    { cats: "Baby Products", img: babys, data:category?.baby },
  ];

  function prev() {
    console.log(slide.current.scrollLeft);
    console.log(slide.current.scrollWidth);
    console.log(slide.current.offsetWidth);
    slide.current.scrollBy({
      left: -slide.current.scrollWidth / 10,
      behavior: "smooth",
    });
  }

  function next() {
    console.log(slide.current.scrollWidth);
    console.log(slide.current.offsetWidth);
    slide.current.scrollBy({
      left: slide.current.scrollWidth / 10,
      behavior: "smooth",
    });
  }

  useEffect(() => {
    function scrollEl() {
      //console.log("Slide")
      if (slide.current?.scrollLeft === 0) {
        setisprev(false);
      } else {
        setisprev(true);
      }

      if (
        slide.current?.scrollLeft + slide.current?.offsetWidth >=
        slide.current?.scrollWidth
      ) {
        setisnext(false);
      } else {
        setisnext(true);
      }
    }

    slide.current?.addEventListener("scroll", scrollEl);

    return () => slide.current?.removeEventListener("scroll", scrollEl);
  }, [slide.current?.scrollLeft]);

  return (
    <div className="min-[1000px]:hidden mx-auto w-[96%]">
      <div className="overflow_hidden_wrapper">
        <div className={isprev ? "prevs" : "prev_none"} onClick={prev}>
          <img src={back} alt="back" />
        </div>
        <div className={isnext ? "nexts" : "next_none"} onClick={next}>
          <img src={foward} alt="foward" />
        </div>
        <div ref={slide} className="overflow_auto_wrapper">
          {data?.map(({ cats, img, data }, idx) => {
            return (
              <div
                className="groupWidget_album_item"
                onClick={() => {
                  navigate(`/detail`, {
                    state: {
                      navtitle:cats,
                      data
                    },
                  });
                }}
                key={idx + 1}
              >
                <div className="flex items-center justify-center flex-col space-y-[2%] ">
                  <div className="bg-[#009999] bg-opacity-30 min-[450px]:rounded-lg flex justify-center items-center rounded-md w-[90px] h-[90px] min-[450px]:w-[150px] min-[450px]:h-[150px]">
                   <div className="min-[450px]:w-[150px] min-[450px]:h-[100px]  w-[90px] h-[70px]">
                   <img className="w-full h-full object-cover" src={img} alt="" />
                   </div>
                   
                  </div>
                  <span className="text-center">{cats}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MobileCategories;
