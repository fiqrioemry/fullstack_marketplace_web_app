import React from "react";
import Image from "next/image";

const CategoryCard = () => {
  const categoryList = [
    {
      title: "Electronics",
      image: "/assets/computer.png",
    },
    {
      title: "Handphone and Tablets",
      image: "/assets/handphone.png",
    },
    {
      title: "Men's Fashion",
      image: "/assets/mens_fashion.png",
    },
    {
      title: "Women's Fashion",
      image: "/assets/womens_fashion.png",
    },
  ];
  return (
    <>
      {categoryList.map((item, index) => {
        return (
          <div className="borders p-2 text-center" key={index}>
            <div className="h-[175px] flex-center">
              <Image width={175} height={175} src={item.image} alt="category" />
            </div>
            <h4>{item.title}</h4>
          </div>
        );
      })}
    </>
  );
};

export default CategoryCard;
