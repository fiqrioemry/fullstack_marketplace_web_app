"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { MdShoppingCart, MdOutlineMenu, MdP } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { Input } from "./ui/input";
const Header = () => {
  const [user, setUser] = useState(true);
  return (
    <header className="py-3 borders-b">
      <div className="container mx-auto flex-between">
        <div className="hidden md:flex items-center space-x-2 tracking-[1px]">
          <h1>NEXT</h1>
          <span className="px-3 py-1 bg-primary text-background ">SHOP</span>
        </div>

        <div className="w-[250px] md:w-[300px]">
          <Input className="w-full" />
        </div>

        <div className="flex-between space-x-4">
          <button>
            <MdShoppingCart className="text-3xl" />
          </button>
          <button className="flex md:hidden">
            <MdOutlineMenu className="text-3xl" />
          </button>
          {user ? (
            <button className="hidden md:flex-between space-x-4">
              <FaUserCircle className="text-3xl" />
              <span>username 01</span>
            </button>
          ) : (
            <div className="hidden md:block space-x-4">
              <Button className="text-xs">Sign-In</Button>
              <Button className="text-xs">Sign-up</Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
