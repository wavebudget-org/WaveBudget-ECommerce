import React from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export const RequireAuth = ({ children }) => {
  const user = useSelector((state) => state.user);
  console.log(user);
  const location = useLocation();
  if (user.currentUser) {
    return <> {children} </>;
  } else {
    toast.error("Access Denied, login required");
    return <Navigate to="/" state={{ path: location.pathname }} />;
  }
};
