"use client";

import { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { FiShoppingCart } from "react-icons/fi";
import OfferTab from "./offerTab";
import useUserData from "../hooks/useUserData";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Toaster from "../utils/toaster";

const Header = () => {
  const { getUserCredentials } = useUserData();
  const { data: userData } = getUserCredentials;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();

  const handleUserClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    try {
      Cookies.remove("authToken", { path: "/" });
      router.push("/login");
      setIsDropdownOpen(!isDropdownOpen);
      Toaster({ message: "Logout successful", type: "success" });
    } catch (err) {
      console.log("logout failed");
      Toaster({ message: "Logout failed", type: "error" });
    }
  };

  return (
    <div className="fixed left-0 right-0 top-0 z-50 bg-white">
      <div className="flex h-[100px] w-full flex-col justify-between border-2 px-8 py-3">
        <ul className="flex gap-5 self-end text-sm font-light tracking-wide">
          <li>Help</li>
          <li>Orders & Returns</li>
          {userData && (
            <li className="relative">
              <span onClick={handleUserClick} className="cursor-pointer">
                Hi, {userData.name}
              </span>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-lg border border-gray-200 bg-white shadow-lg">
                  <ul className="py-2">
                    <li
                      onClick={handleLogout}
                      className="cursor-pointer px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      Logout
                    </li>
                  </ul>
                </div>
              )}
            </li>
          )}
        </ul>
        <div className="grid grid-cols-12 items-center gap-10">
          <h1 className="col-span-2 text-heading font-bold leading-heading-line-height">
            ECOMMERCE
          </h1>
          <ul className="col-span-8 flex justify-center gap-10 self-end text-base font-semibold leading-text-line-height tracking-wide">
            <li>Categories</li>
            <li>Sale</li>
            <li>Clearance</li>
            <li>New stock</li>
            <li>Trending</li>
          </ul>
          <ul className="col-span-2 flex justify-end gap-10 self-end">
            <li>
              <IoSearchOutline size={24} />
            </li>
            <li>
              <FiShoppingCart size={24} />
            </li>
          </ul>
        </div>
      </div>
      <OfferTab />
    </div>
  );
};

export default Header;
