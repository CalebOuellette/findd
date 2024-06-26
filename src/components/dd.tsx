import React from "react";
import styles from "./dd.module.css";

export const DD = ({ tiny = false }: { tiny?: boolean }) => {
  return (
    <div>
      <svg
        width={tiny ? "30" : "91"}
        height={tiny ? "30" : "91"}
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
          className={styles.pulse}
          id="outer-circle"
        />
        <circle
          cx="44.2138"
          cy="44.2138"
          r="38.9081"
          fill="#FF7B1B"
          fillOpacity="0.5"
          style={{
            animationDelay: ".1s",
          }}
          className={styles.pulse}
          id="middle-circle"
        />
        <circle
          cx="44.2138"
          cy="44.2138"
          r="30.6025"
          fill="#FF7B1B"
          id="inner-circle"
        />
        <circle
          id="left-eye"
          cx="30.0654"
          cy="35.371"
          r="5.30565"
          fill="white"
          className={styles.move}
          fillOpacity="0.82"
        />
        <circle
          id="right-eye"
          cx="54.8251"
          cy="35.371"
          r="5.30565"
          fill="white"
          className={styles.move}
          fillOpacity="0.82"
        />
      </svg>
    </div>
  );
};
