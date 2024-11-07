"use client";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";

const FilterBox = () => {
  return (
    <div className="px-0 md:px-2">
      <div className="uppercase py-2">Filter</div>
      <div className="border-t-2 border-b-2 border-primary ">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-2">
            <AccordionTrigger>Select City</AccordionTrigger>
            <AccordionContent className="space-y-2">
              {[...Array(5)].map((_, index) => {
                return (
                  <div className="flex items-center space-x-2" key={index}>
                    <Checkbox id="terms" />
                    <label
                      htmlFor="terms"
                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Medan
                    </label>
                  </div>
                );
              })}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Select Category</AccordionTrigger>
            <AccordionContent className="space-y-2">
              {[...Array(5)].map((_, index) => {
                return (
                  <div className="flex items-center space-x-2" key={index}>
                    <Checkbox id="terms" />
                    <label
                      htmlFor="terms"
                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Electronics
                    </label>
                  </div>
                );
              })}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Select Price</AccordionTrigger>
            <AccordionContent className="space-y-2">
              {[...Array(5)].map((_, index) => {
                return (
                  <div className="flex items-center space-x-2" key={index}>
                    <Checkbox id="terms" />
                    <label
                      htmlFor="terms"
                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Electronics
                    </label>
                  </div>
                );
              })}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default FilterBox;
