"use client";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PaginationBox from "@/components/common/PaginationBox";

const DisplayContet = () => {
  const [selectedTab, setSelectedTab] = useState("product");
  return (
    <div className="px-0 md:px-4 ">
      <Tabs
        value={selectedTab}
        onValueChange={(value) => setSelectedTab(value)}
        className="px-0 md:px-4"
      >
        <TabsList className="border-b border-primary ">
          <TabsTrigger
            className={`${
              selectedTab === "product" ? "border-b-4" : ""
            } px-4 py-[6.5px] border-primary`}
            value="product"
          >
            PRODUCT
          </TabsTrigger>
          <TabsTrigger
            className={`${
              selectedTab === "store" ? "border-b-4" : ""
            } px-4 py-[6.5px]  border-primary`}
            value="store"
          >
            STORE
          </TabsTrigger>
        </TabsList>
        <TabsContent value="product">
          <div className="flex flex-col md:flex-row items-center justify-between py-2 mb-6 ">
            <div>menampilkan hasil pencarian : product name</div>
            <div className="flex w-full md:w-auto justify-start md:justify-end items-center gap-x-4">
              <div>Sort By</div>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Last added" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="apple">Minimum price</SelectItem>
                    <SelectItem value="banana">Maximum price</SelectItem>
                    <SelectItem value="blueberry">Most Favorite</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-4">
            {[...Array(8)].map((_, index) => {
              return (
                <div className="uppercase text-[12px]" key={index}>
                  <div className="w-full  bg-background border-2 border-primary px-2 py-2  ">
                    <div className="border-2 border-primary w-full h-[150px]"></div>
                    <div className="font-medium tracking-[1px]">
                      Product Name
                    </div>
                    <div>Rp. 100.000</div>
                    <div className="">
                      <button className="bg-primary border-2 border-primary hover:bg-white hover:text-primary transition-all duration-300 font-medium py-2 px-4 text-white w-full tracking-[1.5px]">
                        DETAIL
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <PaginationBox />
        </TabsContent>
        <TabsContent value="store"></TabsContent>
      </Tabs>
    </div>
  );
};

export default DisplayContet;
