import { useState } from "react";
import { useDispatch } from "react-redux";
import { createCard } from "../../../redux/thunks/card";
import { editList } from "../../../redux/thunks/list";
import { Dropdown } from "../DropDown/DropDown";
import styles from "./List.module.css";

export const List = ({ title, dashboard_id, list_id, handleDelete }) => {
  const [titleToggle, setTitleToggle] = useState(false);
  const [titleName, setTitleName] = useState(title);
  const dispatch = useDispatch();

  const handleBlur = () => {
    if (titleName.length === 0) {
      setTitleName(title);
      setTitleToggle(false);
    } else {
      dispatch(editList(list_id, titleName));
      setTitleToggle(false);
    }
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {titleToggle ? (
          <input
            className={styles.titleinput}
            value={titleName}
            onChange={(e) => {
              setTitleName(e.target.value);
            }}
            onBlur={() => {
              handleBlur();
            }}
            autoFocus={true}
            maxLength={12}
          />
        ) : (
          <div
            className={styles.title}
            onClick={() => {
              setTitleToggle(true);
            }}
          >
            {titleName}
          </div>
        )}
        <Dropdown
          onClick={() => {
            handleDelete(dashboard_id, list_id);
          }}
          options={["Archive this list"]}
        />
      </div>
      <button
        className={styles.card}
        onClick={() => {
          dispatch(createCard(list_id, "card"));
        }}
      >
        + Add a card
      </button>
    </div>
  );
};
