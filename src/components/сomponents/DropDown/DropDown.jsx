import { useState } from "react";
import styles from "./DropDown.module.css";

export const Dropdown = ({ onClick, options }) => {
  const [isActive, setIsActive] = useState(false);
  document.addEventListener("click", (e) => {
    setIsActive(false);
  });
  return (
    <div
      className={styles.container}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className={styles.button} onClick={(e) => setIsActive(!isActive)}>
        ...
      </div>
      {isActive && (
        <div className={styles.content}>
          {options.map((option) => (
            <div
              key={option}
              onClick={(e) => {
                onClick();
                setIsActive(false);
              }}
              className={styles.contentitem}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
