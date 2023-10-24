import React from "react";
import logo from "../../assets/images/waveb.png";
import user from "../../assets/images/user.png";
import { useNavigate, useLocation } from "react-router-dom";
const TopNavBar=({merchant}) => {
    const {pathname} = useLocation()
    const navigate = useNavigate()
    return (
        <div className={`let swipeIn fixed right-0  top-0 w-full z-10 sm:w-[95%] min-[1000px]:w-[80%] xl:w-[83%] float-right  bg-white flex justify-between items-center border-b-2 shadow-lg ${pathname === "/seller/userinfo"? 'right-0' :'min-[450px]:right-[9px]'} `}>
            
            <div
            onClick={() => {
                navigate("/seller/home")
            }}
             className="px-6 min-[1000px]:pl-14 xl:px-6 max-[450px]:px-3 text-black flex items-center justify-start space-x-2">
            <div className="w-12 h-6">
              <img className="w-full h-full" src={logo} alt="" />
            </div>
            <div className="uppercase font-semibold text-[#009999]">Wave Budget</div>
            </div>
          
            <div className="px-6  max-[450px]:px-3 flex items-center space-x-3">
                <div className="min-w-max max-[450px]:px-3 max-[450px]:py-4 px-6 py-6 font-light text-gray-100  bg-[#009999]"><span>{merchant || '----------'}</span></div>
                <div className="min[450px]:w-11 min-[450px]:h-8 h-6 w-6">
                    <img className="w-full h-full" src={user} alt="avatar" />
                </div>
            </div>

        </div>
    )
}


export default TopNavBar