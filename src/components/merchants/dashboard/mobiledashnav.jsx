import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { IoMdAddCircle } from "react-icons/io";
import { MdOutlineEditNote } from "react-icons/md";
import { HiHome, HiOutlineHome } from "react-icons/hi";
import CategoryNav from "../merchantCategory/categoryNav";
import { getExistingDoc } from "firebasedatas/firebaseAuth";
import { useNavigate } from "react-router-dom";
import { HiOutlineUserCircle, HiUserCircle } from "react-icons/hi";
import { useSelector } from "react-redux";

const MobileDashboard = () => {
  const { currentUser } = useSelector((state) => state.user);

  const [ismobile, setismobile] = useState(false);
  const { pathname } = useLocation();
  const [key, setKey] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    async function getUser() {
      await getExistingDoc(currentUser)
        .then((res) => {
          setKey(res.key);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    getUser();
  }, [currentUser]);

  return (
    <>
      <div className="w-full sm:hidden h-fit text-sm fixed bottom-0 inset-x-0 shadow-lg border-t text-zinc-800 bg-white z-50">
        <div className="w-full flex justify-between items-center py-2 px-6">
          <div
            onClick={() => {
              setismobile(!ismobile);
            }}
            className="relative flex flex-col space-y-1 items-center justify-center">
            <span>
              <MdOutlineEditNote className="text-[22px]" />
            </span>
            <span> Edit </span>
          </div>

          <Link
            to={`/seller/store/${key}`}
            className={`flex flex-col space-y-1 items-center justify-center ${pathname === `/seller/store/${key}` ? "text-[#009999]" : "text-zinc-700"}`}>
            <span>
              <IoMdAddCircle className="text-[22px]" />
            </span>
            <span> Add products </span>
          </Link>

          {pathname === "/" ? (
            <div
              onClick={() => {
                navigate("/seller/home");
              }}
              className="text-[#009999] flex flex-col space-y-1 items-center justify-center">
              <HiHome className="text-[20px]" />
              <span className="font-medium"> Home</span>
            </div>
          ) : (
            <div
              onClick={() => {
                navigate("/seller/home");
              }}
              className="text-zinc-800 flex flex-col space-y-1 items-center justify-center">
              <HiOutlineHome className="text-[20px]" />
              <span className="font-normal">Home</span>
            </div>
          )}

          {pathname === "/seller/userinfo" ? (
            <div
              onClick={() => {
                navigate("/seller/userinfo");
              }}
              className="text-[#009999] flex flex-col space-y-1 items-center justify-center">
              <HiUserCircle className="text-[20px]" />
              <span className="font-normal">My wave</span>
            </div>
          ) : (
            <div
              onClick={() => {
                navigate("/seller/userinfo");
              }}
              className="text-zinc-800 flex flex-col space-y-1 items-center justify-center">
              <HiOutlineUserCircle className="text-[20px]" />
              <span className="font-normal">My wave</span>
            </div>
          )}
        </div>
      </div>
      <CategoryNav ismobile={ismobile} setismobile={setismobile} />
    </>
  );
};

export default MobileDashboard;
