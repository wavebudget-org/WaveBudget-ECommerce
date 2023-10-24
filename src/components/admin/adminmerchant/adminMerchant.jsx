import React, { useState, useEffect } from "react";
import AdminTopBar from "../dashboard/adminTopBar";
import AdminDesktopDashboard from "../dashboard/admindesktopDash";
import AdminMobileDashboard from "../dashboard/adminmobileDash";
import { getMerchant } from "firebasedatas/userInformation";
import { useNavigate } from "react-router-dom";
import loading from "../../../assets/Svg/loading.svg";
import { getExistingDoc } from "firebasedatas/firebaseAuth";
import {
  deleteProfile,
  getStores,
  updateProfiles,
} from "firebasedatas/updateProfile";
import { updateProfile } from "firebase/auth";
import { AiOutlineSecurityScan } from "react-icons/ai";
import { toast } from "react-hot-toast";
import { saveData } from "firebasedatas/storeRegdata";
import _ from 'lodash'
const AdminMerchant = () => {
  const [loadings, setLoadings] = useState(false);
  const [myMerchants, setMerchants] = useState([]);
  const navigate = useNavigate();
  const [ids, setId] = useState()
 
 


  const sellers = [];

  async function getUsers() {
    await getMerchant(sellers)
      .then((res) => {
        console.log(res);

        setMerchants(_.uniqBy(res, 'userId.stringValue'));
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
   

    getUsers();
  }, []);

  async function toggleActivation(id) {
    setId(id)
    const stores = [];
    setLoadings(true)
    await getExistingDoc(id)
      .then(async (res) => {
        console.log(res);
        const users = res
        if (res.key) {
          console.log(res.key);
          await deleteProfile(id)
            .then(async (res) => {
              console.log(res);
             
              await saveData(id, {
                email: users?.email || 'nil',
                store: users?.store || 'nil',
                userId: users?.userId || 'nil',
                address: users?.address || 'nil',
                phoneNumber: users?.phoneNumber || 'nil',
                acctname: users?.acctname || 'nil',
                acctnumber: users?.acctnumber || 'nil',
                bankname: users?.bankname || 'nil',
                businessType: users?.businessType || 'nil',
                cac : users?.cac || 'nil',
                businessDescription: users?.businessDescription|| 'nil',
                type: 'Merchant'
              })
                .then((res) => {
                  console.log(res);
                  setLoadings(false)
                  getUsers()
                  toast.success('account deactivated')
                })
                .catch((err) => {
                  console.log(err);
                  setLoadings(false)
                  toast.error(err.code)
                });
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          await getStores(stores)
            .then(async (res) => {
              console.log(res);
              const index = res.findIndex((val) => {
                return val.userId.stringValue === id;
              });
              console.log(id)
              console.log(index)
              const userKey = res[index].key.stringValue;
              console.log('this is his key',userKey);

              await updateProfiles(id, {key:userKey})
                .then((res) => {
                  console.log(res);
                    setLoadings(false)
                    getUsers()
                  toast.success("user activated");
                })
                .catch((err) => {
                  console.log(err);
                  toast.error(err.code)
                });
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="w-full h-full">
      <AdminTopBar />
      <div className="let mx-auto swipeIn py-2 mt-[55px] text-zinc-700 min-[450px]:mt-[68px] w-full sm:w-[95%] min-[1000px]:w-[80%] xl:w-[82%] pb-[5rem] sm:pb-[5rem] float-right px-2 text-">
        <div className="grid grid-cols-3 px-2  border-zinc-700 w-full mx-auto ">
          <div className="w-full justify-center flex items-center">
            <span>Email</span>
          </div>
          <div className="w-full justify-center flex items-center">
            <span className="">Status</span>
          </div>
          <div className="w-full justify-center flex items-center">
            <span className="bg-none w-2 h-2"></span>
          </div>
        </div>

        {myMerchants.length === 0 && (
          <div className="w-full flex items-center justify-center">
            <img src={loading} alt="" />
          </div>
        )}

        {myMerchants?.map(({ email, key, userId }, idx) => {
          return (
            <div
              key={idx}
              className="grid grid-cols-3  py-2 px-2 border-b border-zinc-400 w-full items-center mx-auto b"
            >
              <div className="flex space-x-2 items-center justify-start ">
                <span>{idx + 1}</span>
                <span className="truncate w-[98vw] text-zinc-700 sm:pr-[10%] flex flex-wrap overflow-hidden">
                  <span className="text-ellipsis whitespace-nowrap overflow-hidden w-[190px] min-[450px]:w-[190px]">
                    {email?.stringValue}
                  </span>
                </span>
              </div>
              {loadings && ids === userId?.stringValue ? (
                <div className=" bg-opacity-25 bg-[#009999] flex w-[30%] px-2 py-1 mx-auto justify-center items-center">
                  <span className="border-[#009999] border-t-2 border-b-2 rounded-full h-[14px] p-2 w-[14px] animate-spin"></span>
                </div>
              ) : (
                <div
                  onClick={() => {
                    toggleActivation(userId?.stringValue);
                  }}
                  className="w-full flex items-center justify-center"
                >
                  {key?.stringValue ? (
                    <span className="text-[#009999] hover:bg-opacity-40 cursor-pointer rounded-sm bg-[#009999] bg-opacity-25 p-1">
                      Activated
                    </span>
                  ) : (
                    <span className="text-red-600 hover:bg-red-300 cursor-pointer bg-red-100 rounded-sm p-1">
                      Not activated
                    </span>
                  )}
                </div>
              )}

              <div className="w-full flex justify-end">
                <button
                  onClick={() => {
                    navigate(`/admin/merchantdetail/${userId?.stringValue}`);
                  }}
                  className=" flex justify-center items-center w-fit p-1 rounded-sm bg-[#009999] bg-opacity-25 text-[#009999]"
                >
                  View Detail
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <AdminDesktopDashboard />
      <AdminMobileDashboard />
    </div>
  );
};

export default AdminMerchant;
