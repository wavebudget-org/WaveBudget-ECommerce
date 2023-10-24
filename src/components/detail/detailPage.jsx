import VisHeader from "components/Landing/minors/headers/vHeader";
import HidHeader from "components/Landing/minors/headers/hidHeader";
import GroupHeaders from "components/groupHeadings/groupHeaders";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import detail from "../../assets/images/detail.jpg"
import MoreWidget from "./moreWidget";
import WaveFooter from "components/Landing/minors/footer/footer";

const DetailPage = () => {
  const { state } = useLocation();
  const [isVisible, setisVisible] = useState(false);
  const { navtitle, data } = state;
  return (
    <div className="max-[450px]:mt-[56px] w-full h-full">
      <VisHeader />
      <HidHeader isVisibles={isVisible} />

    <div className="relative w-full h-[150px] hidden min-[450px]:block">
    <img className="h-full w-full object-cover" src={detail} alt="" />
    <div className="w-full h-full absolute inset-0 ">
    <div className="flex justify-center items-center h-full text-teal-100 text-6xl special font-medium">{navtitle}</div>
    </div>
    
    </div>
      <GroupHeaders headings={navtitle} />
   
      <div className="mt-0  h-full relative min-[450px]:mt-0 sm:mt-0 mb-[1rem] w-full p-2 min-[450px]:p-3 gap-6 flex flex-col">
        <MoreWidget payload={data}/>
      </div>
      
     
    </div>
  );
};

export default DetailPage;
