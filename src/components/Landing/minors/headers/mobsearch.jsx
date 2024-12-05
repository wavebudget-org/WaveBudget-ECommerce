import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const MobileSearch = () => {
  const [searchText, setsearchText] = useState();
  const navigate = useNavigate();

  return (
    <div className="block min-[450px]:hidden z-2 fixed inset-x-0 top-[57px] bg-white w-full px-8 py-3 mx-auto">
      <div className="relative w-full h-9 rounded-3xl">
        <input
          onChange={(e) => {
            setsearchText(e.target.value);
          }}
          type="text"
          name="text"
          placeholder="search"
          value={searchText}
          id="text"
          className="w-full h-full border border-[#009999] rounded-3xl px-4 pr-8 outline-none"
        />
        <div
          className="absolute px-2 h-full flex top-0 rounded-3xl space-x-2 justify-center items-center right-0 bg-[#009999] text-white "
          onClick={() => {
            if (searchText.trim()) {
              // Navigate to the search URL with query parameters
              navigate(`/catalog/?q=${encodeURIComponent(searchText)}`);
            }
          }}>
          <IoIosSearch />
          <span>Search</span>
        </div>
      </div>
    </div>
  );
};

export default MobileSearch;
