import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getExistingDoc } from "firebasedatas/firebaseAuth";
import newimage from "../../../assets/images/new.png";
import TopNavBar from "../topnavbar";
import DesktopDashNav from "../dashboard/desktopNav/desktopdashnav";
import MobileDashboard from "../dashboard/mobiledashnav";
const MerchantInfo = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [email, setEmail] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [merchant, setMerchant] = useState();
  useEffect(() => {
    if (!currentUser) return;
    async function getUser() {
      await getExistingDoc(currentUser)
        .then((res) => {
          setMerchant(res.store);
          setEmail(res.email);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    getUser();
  }, [currentUser]);

  function handleLogout() {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  }

  return (
    <div className="w-full h-full">
      <TopNavBar merchant={merchant} />
      <div className="let swipeIn mt-[10px] text-zinc-700 min-[450px]:mt-[30px] w-full sm:w-[95%] min-[1000px]:w-[80%] xl:w-[83%] pb-[5rem] sm:pb-[5rem] space-y-[5%] float-right p-6 text-">
        <div className="px-3 py-6 mt-[50px] relative bg-white rounded-lg mx-auto w-full h-fit">
          {merchant && (
            <button
              onClick={() => {
                handleLogout();
              }}
              className="absolute right-3 top-3 p-[2px] border  border-zinc-700">
              Log out
            </button>
          )}
          <div className=" items-center justify-start flex space-x-2">
            <div className="w-[50px] h-[50px]">
              <img src={newimage} alt="" className="w-full h-full object-cover" />
            </div>

            {merchant && (
              <div className="text-zinc-700 space-y-2">
                <div>{`Store Name: ${merchant} `}</div>
                <div>{`Email: ${email}`}</div>
              </div>
            )}
            {!merchant && (
              <div className="text-zinc-700 flex items-center space-x-2">
                <div
                  onClick={() => {
                    navigate("/seller/login");
                  }}>
                  Log in
                </div>{" "}
                <span>/</span>
                <div
                  onClick={() => {
                    navigate("/seller/register");
                  }}>
                  Sign up
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <DesktopDashNav />
      <MobileDashboard />
    </div>
  );
};

export default MerchantInfo;
