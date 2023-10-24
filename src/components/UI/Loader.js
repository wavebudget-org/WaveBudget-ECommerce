import React from "react";

function Loader() {
  return (
    <div className="flex justify-center items-center">
    <div className="rounded-full border-2 animate-spin border-r-0 border-b-0 w-4 h-4 border-slate-50"></div>
  </div>
  );
}

export default Loader;
