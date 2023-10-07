import { useEffect, useState } from "react";

const ShowSingleDigit = ({ initialArray = [], speed = 1, delay = 0 }) => {
  const [currentDigit, setCurrentDigit] = useState(initialArray[0]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let cycleTimer: NodeJS.Timeout;

    const initialTimer = setTimeout(() => {
      cycleTimer = setInterval(() => {
        setCurrentDigit(initialArray[currentIndex]);

        if (currentIndex === initialArray.length - 1) {
          clearInterval(cycleTimer);
        } else {
          setCurrentIndex((prevIndex) => prevIndex + 1);
        }
      }, speed * 1000);
    }, delay * 1000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(cycleTimer);
    };
  }, [currentIndex, initialArray, speed, delay]);

  return currentDigit;
};

export default ShowSingleDigit;
