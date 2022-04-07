import { useState } from "react";
import styles from "./DropDown.module.css";

export const Dropdown = ({ options }) => {
  const [isActive, setIsActive] = useState(false);
  return (
    <div
      className={styles.container}
      onClick={(e) => {
        e.stopPropagation();
      }}
      tabIndex={0}
      onBlur={() => setIsActive(false)}
    >
      <div
        className={styles.button}
        onClick={() => {
          setIsActive(!isActive);
        }}
      >
        ...
      </div>
      {isActive && (
        <div className={styles.content}>
          {options.map((option) => (
            <div
              key={option.title}
              onClick={() => {
                option.onClick();
                setIsActive(false);
              }}
              className={styles.contentitem}
            >
              {option.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
