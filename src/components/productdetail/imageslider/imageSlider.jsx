import React, { useRef, useEffect, useState } from "react";
import "./imageSlider.scss";
import { IoIosClose } from "react-icons/io";

const ImageSlider = ({ isSlider, setisSlider, images }) => {
  const slide = useRef();
  const [slider, setSlider] = useState();

  useEffect(() => {
    if (window.innerWidth >= 721) {
      setSlider(400);
    } else if (window.innerWidth < 720 && window.innerWidth >= 566) {
      setSlider(280);
    } else {
      setSlider(320);
    }
  }, [slider]);
  function prev() {
    //console.log(this.idx)
    slide.current?.scrollBy({
      left: -slider,
      behavior: "smooth",
    });
  }
  function next() {
    slide.current?.scrollBy({
      left: slider,
      behavior: "smooth",
    });
  }

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        setisSlider(false);
      }}
      className={isSlider ? "w-full h-full inset-0 fixed z-50 bg-black bg-opacity-60" : "hidden"}>
      <div className="w-[400px] max-[720px]:w-[280px] max-[565px]:w-[320px] h-[500px] sm:h-[80%] overflow-auto sm:overflow-hidden transform transition duration-300 ease-in-out absolute inset-0 m-auto grid grid-cols-1 bg-white rounded-lg sm:rounded-xl">
        <div
          onClick={(e) => {
            e.stopPropagation();
            setisSlider(false);
          }}
          className="absolute top-[-1px] right-0 rounded-full p-1 z-50 bg-gray-300">
          <IoIosClose className="text-black text-[18px]" />
        </div>
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className=" relative h-full w-full overflow-hidden rounded-tl-lg sm:rounded-l-xl rounded-tr-lg sm:rounded-tr-none">
          <div className="prev" onClick={prev}>
            &#10094;
          </div>
          <div className="next" onClick={next}>
            &#10095;
          </div>
          <div ref={slide} className="hide-scroll overflow-x-auto w-full h-full">
            <div className="min-w-max flex h-full ">
              {images?.map((item, index) => {
                return (
                  <div key={index} className="w-[400px] max-[720px]:w-[280px] max-[565px]:w-[320px] h-full rounded-tl-lg sm:rounded-l-xl rounded-tr-lg sm:rounded-tr-none">
                    <img className="w-full h-full rounded-tl-lg sm:rounded-l-xl rounded-tr-lg sm:rounded-tr-none object-fill" src={item.url} alt="" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;
