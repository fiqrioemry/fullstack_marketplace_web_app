"use client";
import React from "react";
import { Button } from "@/components/ui/button";

const PaginationBox = () => {
  return (
    <div className="flex py-6 space-x-1   ">
      <Button>PREV</Button>
      <Button>1</Button>
      <Button>2</Button>
      <Button>3</Button>
      <Button>4</Button>
      <Button>NEXT</Button>
    </div>
  );
};

export default PaginationBox;
