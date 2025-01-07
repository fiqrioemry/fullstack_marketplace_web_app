import { useState, useEffect } from "react";

const useResponsiveCount = () => {
  const [count, setCount] = useState(5); // Default untuk ukuran layar xl

  useEffect(() => {
    const updateCount = () => {
      const width = window.innerWidth;

      if (width >= 1280) {
        // xl
        setCount(5);
      } else if (width >= 1024) {
        // lg
        setCount(4);
      } else if (width >= 768) {
        // md
        setCount(3);
      } else {
        // sm dan lebih kecil
        setCount(2);
      }
    };

    updateCount();

    window.addEventListener("resize", updateCount);

    return () => window.removeEventListener("resize", updateCount);
  }, []);

  return count;
};

export default useResponsiveCount;
