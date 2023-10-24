import React, { useState, useEffect } from "react";
import AdminTopBar from "../dashboard/adminTopBar";
import AdminDesktopDashboard from "../dashboard/admindesktopDash";
import AdminMobileDashboard from "../dashboard/adminmobileDash";
import detail from "../../../assets/images/detail.jpg";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import newimage from "../../../assets/images/new.png";
import { getExistingDoc } from "firebasedatas/firebaseAuth";
import { getPurchased } from "firebasedatas/getPurchased";
const MerchantDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState();


  useEffect(() => {
    if (!id) return;
    async function getUser() {
      await getExistingDoc(id)
        .then((res) => {
          console.log(res);
          setData(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    getUser();
  }, []);


  return (
    <div className="w-full h-full bg-gray-100">
      <AdminTopBar />
      <div className="let mx-auto swipeIn py-2 mt-[55px] text-zinc-700 min-[450px]:mt-[65px] w-full sm:w-[96%] min-[1000px]:w-[80%] xl:w-[84%] pb-[5rem] sm:pb-[5rem] float-right px-2 text-">
        <div className="relative w-full h-[100px] min-[450px]:h-[150px]">
          <div
            onClick={() => {
              navigate(-1);
            }}
            className="absolute cursor-pointer z-50 top-3 left-3 text-[20px] min-[450px]:text-[30px] text-teal-100 "
          >
            <AiOutlineArrowLeft />
          </div>
          <img className="h-full w-full object-cover" src={detail} alt="" />
          <div className="w-full h-full absolute inset-0 ">
            <div className="pl-12 max-[450px]:pl-8 flex  items-center space-x-2 h-full text-teal-100 text-[15px] min-[450px]:text-lg ">
              <div className="w-[80px] h-[80px] max-[450px]:w-[50px] max-[450px]:h-[50px]">
                <img
                  src={newimage}
                  alt=""
                  className="w-full h-full "
                />
              </div>
              <div className="flex flex-col ">
                <div className="flex space-x-2 max-[450px]:space-x-1 items-center w-full  ">
                  <span>Name:</span>
                  <span>{data?.store}</span>
                </div>
                <div className="flex space-x-2 max-[450px]:space-x-1 items-center w-full">
                  <span>Email:</span>
                  <span>{data?.email}</span>
                </div>
              </div>
            </div>
          
            <div className="space-y-3 flex flex-col max-[450px]:space-y-2 w-full">
            <div className="flex space-x-2 max-[450px]:space-x-1 p-2 w-full">
                  <span className="font-medium">Store Name:</span>
                  <span>{data?.store}</span>
                </div>
                
              <div className="flex space-x-2 max-[450px]:space-x-1 pl-2 w-full">
          <span className="font-medium">Email:</span>
          <span>{data?.email}</span>
        </div>
            
            <div className="flex space-x-2 max-[450px]:space-x-1 pl-2 w-full">
            <span className="font-medium">Business Type:</span>
            <span>{data?.businessType}</span>
          </div>
         
          <div className="flex  space-x-2 max-[450px]:space-x-1 pl-2 w-full">
              <span className="font-medium">Phone Number:</span>
              <div>{data?.phoneNumber}</div>
            </div>
            <div className="flex  space-x-2 max-[450px]:space-x-1 pl-2 w-full">
              <span className="font-medium">Account Name:</span>
              <div>{data?.acctname}</div>
            </div>
            <div className="flex  space-x-2 max-[450px]:space-x-1 pl-2 w-full">
              <span className="font-medium">Account Number:</span>
              <div>{data?.acctnumber}</div>
            </div>
            <div className="flex  space-x-2 max-[450px]:space-x-1 pl-2 w-full">
              <span className="font-medium">Bank:</span>
              <div>{data?.bankname}</div>
            </div>
            <div className="flex space-x-2 flex-col max-[450px]:space-x-1 pl-2 w-full">
                <span className="font-medium">Store Address:</span>
                <div>{data?.address}</div>
              </div>
            <div className="flex flex-col space-x-2 max-[450px]:space-x-1 pl-2 w-full">
              <span className="font-medium">Business Description:</span>
              <div>{data?.businessDescription}</div>
            </div>

            <div className="mx-auto w-[300px] h-[400px]">
                <img className="w-full h-full object-fill" src={data?.cac} alt="" />
            </div>
  

            </div>

        
          </div>
        </div>
        
       
       
      </div>

      <AdminDesktopDashboard />
      <AdminMobileDashboard />
    </div>
  );
};

export default MerchantDetail;
