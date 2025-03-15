import { useState, useEffect } from "react";

export function useCountdown(targetTime) {
  const [timeLeft, setTimeLeft] = useState(targetTime - new Date());

  useEffect(() => {
    if (timeLeft <= 0) return;

    const interval = setInterval(() => {
      const now = new Date();
      const remainingTime = targetTime - now;
      setTimeLeft(remainingTime > 0 ? remainingTime : 0);
    }, 1000);

    return () => clearInterval(interval);
  }, [targetTime, timeLeft]);

  const formatTimeLeft = () => {
    if (timeLeft <= 0) return "Expired";

    const hours = Math.floor(timeLeft / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  return formatTimeLeft();
}
