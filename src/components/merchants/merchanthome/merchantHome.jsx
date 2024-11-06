import React, { useState, useEffect } from "react";
import TopNavBar from "../topnavbar";
import { getExistingDoc } from "firebasedatas/firebaseAuth";
import box from "../../../assets/images/box.png";
import { useSelector } from "react-redux";
import DesktopDashNav from "../dashboard/desktopNav/desktopdashnav";
import MobileDashboard from "../dashboard/mobiledashnav";
import { getAll } from "firebasedatas/getProducts";
import { formatter } from "Utils/helpers";
const MerchantHome = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [product, setProduct] = useState();
  const [userId, setuserId] = useState();
  const [merchant, setMerchant] = useState();

  useEffect(() => {
    if (!currentUser) return;
    async function getUser() {
      await getExistingDoc(currentUser)
        .then((res) => {
          setMerchant(res.store);
          setuserId(res.userId);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    getUser();
  }, [currentUser]);

  useEffect(() => {
    const data = [];
    async function getData() {
      await getAll(data)
        .then((res) => {
          setProduct(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    getData();
  }, []);
  return (
    <div className="w-full h-full">
      <TopNavBar merchant={merchant} />
      <div className="let swipeIn mt-[10px] text-zinc-700 min-[450px]:mt-[30px] w-full sm:w-[95%] min-[1000px]:w-[80%] xl:w-[83%] pb-[5rem] sm:pb-[5rem] space-y-[5%] float-right p-6 text-">
        {product?.filter((val) => val.merchantId === userId)?.length === 0 && (
          <div className="w-full max-[450px]:h-[100vw] h-[30vw] inset-0 relative">
            <div className=" m-auto absolute w-[320px] inset-0 flex flex-col justify-center items-center space-y-[4%] h-fit">
              <div className="w-[128px] h-[128px]">
                <img className="w-full h-full" src={box} alt="" />
              </div>
              <div>No item added yet</div>
            </div>
          </div>
        )}

        <div className="mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-[1rem]  text-zinc-700">
          {product?.length !== 0 &&
            product
              ?.filter((val) => val.merchantId === userId)
              .map((item, index) => {
                return (
                  <div key={index} className="pb-3 group w-[160px] flex flex-col space-y-2 overflow-hidden h-fit ld_widget bg-white rounded-md sm:rounded-lg">
                    <div className="w-full h-full cursor-pointer duration-300">
                      <div className="w-full h-[140px] img_sz overflow-hidden">
                        <img
                          className="h-full w-full object-cover min-[450px]:object-fill transform duration-200 group-hover:scale-105"
                          src={item.image.values[0].mapValue.fields.url.stringValue}
                          alt=""
                        />
                      </div>
                      <div className="mt-2 px-2 min-[450px]:space-y-2 space-y-1 text-sm sm:text-[15px]">
                        <p className="truncate  w-[100vw] text-zinc-700 sm:pr-[10%]">
                          <span className="text-ellipsis whitespace-nowrap overflow-hidden w-[150px] min-[450px]:w-[200px]">{item.name}</span>
                        </p>
                        <p className="truncate w-[98vw] text-zinc-700 font-thin sm:pr-[10%] flex flex-wrap overflow-hidden">
                          <span className="text-ellipsis whitespace-nowrap overflow-hidden w-[150px] min-[450px]:w-[200px]">{item.description}</span>
                        </p>
                      </div>
                      <div className="mt-2 min-[450px]:mt-5 px-2 text-[15px] font-medium sm:font-semibold text-zinc-700"> {formatter.format(item.price)}</div>
                    </div>
                  </div>
                );
              })}
        </div>
      </div>
      <DesktopDashNav />
      <MobileDashboard />
    </div>
  );
};

export default MerchantHome;
