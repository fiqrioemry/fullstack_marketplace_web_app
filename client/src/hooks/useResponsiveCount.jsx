import { useState, useEffect } from "react";

const useResponsiveCount = (total) => {
  const [count, setCount] = useState(total || 6); // Default dibuat 6

  useEffect(() => {
    const updateCount = () => {
      const width = window.innerWidth;

      if (width >= 1280) {
        // xl
        setCount(count - 1);
      } else if (width >= 1024) {
        // lg
        setCount(count - 2);
      } else if (width >= 768) {
        // md
        setCount(count - 3);
      } else {
        // sm dan lebih kecil
        setCount(2);
      }
    };

    updateCount();

    window.addEventListener("resize", updateCount);

    return () => window.removeEventListener("resize", updateCount);
  }, [count]);

  return count;
};

export default useResponsiveCount;
