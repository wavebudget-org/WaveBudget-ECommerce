import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../../../assets/images/waveb.png";
import newimage from "../../../../assets/images/new.png";
import { useSelector, useDispatch } from "react-redux";
import { getExistingDoc } from "firebasedatas/firebaseAuth";
const AuthCard = ({ isVisible, isUser, isMobile, setisMobile }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState();
  const [name, setname] = useState();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    if (!currentUser) return;
    async function getUser() {
      await getExistingDoc(currentUser)
        .then((res) => {
          setname(res.name);
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
    <>
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={
          isVisible
            ? "h-[250px] max-[450px]:hidden z-40 absolute w-[300px] text-sm left-[-200px] bg-white bottom-[-250px] flex flex-col shadow-lg rounded-xl space-y-4 px-6 py-4 justify-center items-center"
            : "hidden"
        }>
        <div className="w-10 h-6">
          <img className="w-full h-full" src={logo} alt="" />
        </div>
        <button
          onClick={() => {
            navigate("/signin");
          }}
          className="bg-[#009999] text-white p-2 rounded-2xl flex items-center w-full justify-center">
          Sign in
        </button>

        <button
          onClick={() => {
            navigate("/signup");
          }}
          className="text-[#009999] bg-white border p-2 border-[#009999] rounded-2xl flex items-center w-full justify-center">
          Register for free{" "}
        </button>

        <button
          onClick={() => {
            navigate("/seller/login");
          }}
          className="text-white bg-[#009999] p-2 rounded-2xl flex items-center w-full justify-center">
          Sign as a seller{" "}
        </button>
      </div>

      <div
        className={
          isUser
            ? "h-fit max-[450px]:hidden z-40 absolute w-[300px] text-sm left-[-200px] bg-white bottom-[-133px] flex flex-col shadow-lg rounded-xl space-y-4 py-4 justify-center items-center"
            : "hidden"
        }>
        <div className=" items-center justify-start flex space-x-2">
          <div className="w-[50px] h-[50px]">
            <img src={newimage} alt="" className="w-full h-full object-cover" />
          </div>

          <div className="text-zinc-700 space-y-2">
            <div>{`Name: ${name} `}</div>
            <div>{`Email: ${email}`}</div>
          </div>
        </div>

        <button onClick={handleLogout} className="text-zinc-700 p-1 border rounded-sm">
          Log out
        </button>
      </div>

      <div
        onClick={(e) => {
          e.stopPropagation();
          setisMobile(!isMobile);
        }}
        className={isMobile ? "w-full h-full inset-0 fixed z-[99] bg-black bg-opacity-50 " : "hidden"}>
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="h-fit text-znc-700 let swipeIn min-[450px]:hidden z-40 absolute w-[300px] text-sm top-[45px] left-[47px] bg-white bottom-[-135px] flex flex-col shadow-lg rounded-xl space-y-4 py-3 justify-center items-center">
          <div
            onClick={() => {
              navigate("/signin");
            }}>
            Sign in{" "}
          </div>
          <div
            onClick={() => {
              navigate("/signup");
            }}>
            Register for free{" "}
          </div>
          <div
            onClick={() => {
              navigate("/seller/login");
            }}>
            Sign in/Log in as a seller{" "}
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthCard;
