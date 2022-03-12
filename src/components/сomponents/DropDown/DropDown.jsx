import { useState } from "react";
import styles from "./DropDown.module.css";

export const Dropdown = ({ archiveList, options, archiveAllCards }) => {
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
                if (option === "Archive this list") {
                  archiveList();
                  setIsActive(false);
                } else if (option === "Archive all cards") {
                  archiveAllCards();
                  setIsActive(false);
                }
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
