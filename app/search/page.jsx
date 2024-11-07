"use client";

import React from "react";
import FilterBox from "@/components/search/FilterBox";

import DisplayContet from "@/components/search/DisplayContet";

const page = () => {
  return (
    <section className="py-6 ">
      <div className="container mx-auto text-gray-700">
        <div className="px-0 md:px-2 flex mb-4 items-center space-x-4">
          <div>product / search / result / product name</div>
        </div>

        <div className="flex flex-wrap">
          {/* filter box */}
          <div className="w-full md:w-[20%]">
            <FilterBox />
          </div>

          <div className=" w-full md:w-[80%]">
            <DisplayContet />
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
