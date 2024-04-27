import React, { useEffect, useState } from "react";
import { animated, useSpring } from "@react-spring/web";

export const DD = () => {
  const [animationState, setAnimationState] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationState((prev) => (prev + 1) % 3);
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  console.log("animationState", animationState);

  return (
    <div>
      <svg
        width="91"
        height="91"
        viewBox="0 0 91 91"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="45.098"
          cy="45.098"
          r="45"
          fill="#FF7B1B"
          fillOpacity="0.5"
          id="outer-circle"
        />
        <circle
          cx="44.2138"
          cy="44.2138"
          r="38.9081"
          fill="#FF7B1B"
          fillOpacity="0.5"
          id="middle-circle"
        />
        <circle
          cx="44.2138"
          cy="44.2138"
          r="33.6025"
          fill="#FF7B1B"
          id="inner-circle"
        />
        <circle
          id="left-eye"
          cx="30.0654"
          cy="35.371"
          r="5.30565"
          fill="white"
          fillOpacity="0.82"
        />
        <circle
          id="right-eye"
          cx="54.8251"
          cy="35.371"
          r="5.30565"
          fill="white"
          fillOpacity="0.82"
        />
      </svg>
    </div>
  );
};
