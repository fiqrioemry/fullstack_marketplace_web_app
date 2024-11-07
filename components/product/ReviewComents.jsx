"use client";

import React from "react";
import { FaRegStar } from "react-icons/fa";
import SectionHead from "../common/SectionHead";

const ReviewComents = () => {
  return (
    <div className="space-y-4">
      <SectionHead title="Product Reviews" />

      <div className="h-[400px] borders-tb overflow-y-scroll py-6 space-y-6">
        {[...Array(5)].map((_, index) => {
          return (
            <div
              className="border border-primary min-h-[180px] p-4"
              key={index}
            >
              <div className="flex gap-x-4 py-2">
                <div className="w-12 h-12 rounded-full borders"></div>
                <div>
                  {" "}
                  <div className="flex">
                    <FaRegStar />
                    <FaRegStar />
                    <FaRegStar />
                    <FaRegStar />
                    <FaRegStar />
                  </div>
                  <div>Customer Name</div>
                </div>
              </div>
              <div>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Qui
                  facilis doloremque suscipit totam, quam tempore quasi nihil
                  dolores nisi architecto voluptatum quas illum distinctio!
                  Veritatis numquam repellendus saepe necessitatibus dolor?
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReviewComents;
