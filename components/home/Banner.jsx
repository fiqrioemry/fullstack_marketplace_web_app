"use client";

import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Button } from "../ui/button";

const Banner = () => {
  const banners = [
    {
      url: "/assets/banner1.png",
      title: "banner1",
    },
    {
      url: "/assets/banner2.png",
      title: "banner2",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // styles
  const arrowStyle = "transition-all duration-300";

  // slider logic
  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? banners.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === banners.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  useEffect(() => {
    setCurrentIndex(0);
  }, []);

  // automatic slide animation
  let autoslide = true;
  let slideInterval;
  let intervalTime = 3000;

  const auto = () => {
    slideInterval = setInterval(goToNext, intervalTime);
  };

  useEffect(() => {
    if (autoslide) {
      auto();
    }
    return () => {
      clearInterval(slideInterval);
    };
  }, [currentIndex, auto, autoslide, slideInterval]);

  return (
    <div className="container mx-auto relative flex-center group">
      <div className="w-full flex-center animate-fadeIn">
        <img
          className="w-full h-[250px] md:h-[325px]"
          src={banners[currentIndex].url}
          alt="banner"
        />
      </div>

      <Button
        variant="primary"
        className=" absolute left-3 group-hover:-left-3 opacity-0 group-hover:opacity-100 "
        id="prev"
        onClick={goToPrevious}
      >
        <FaChevronLeft />
      </Button>
      <Button
        variant="primary"
        className="absolute right-3 group-hover:-right-3 opacity-0  group-hover:opacity-100 "
        id="next"
        onClick={goToNext}
      >
        <FaChevronRight />
      </Button>
    </div>
  );
};

export default Banner;
