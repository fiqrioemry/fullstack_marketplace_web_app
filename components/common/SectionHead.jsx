import React from "react";

const SectionHead = ({ title }) => {
  return (
    <div className="flex items-center space-x-4">
      <div className="w-2 h-10 bg-primary"></div>
      <h2>{title}</h2>
    </div>
  );
};

export default SectionHead;
