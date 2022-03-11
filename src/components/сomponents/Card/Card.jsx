import styles from "./Card.module.css";
import { FaPencilAlt } from "react-icons/fa";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { editCard } from "../../../redux/thunks/card";

export const Card = ({ title, id }) => {
  const [iconToggle, setIconToggle] = useState(false);
  const [editToggle, setEditToggle] = useState(false);
  const [titleName, setTitleName] = useState(title);

  const dispatch = useDispatch();

  const handleBlur = () => {
    if (titleName.length === 0) {
      setTitleName(title);
      setEditToggle(false);
    } else {
      dispatch(editCard(id, titleName));
      setEditToggle(false);
    }
  };
  return (
    <div
      className={styles.card}
      onMouseOver={() => {
        setIconToggle(true);
      }}
      onMouseLeave={() => {
        setIconToggle(false);
      }}
    >
      {editToggle ? (
        <input
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
        <div>{titleName}</div>
      )}
      {iconToggle ? (
        <FaPencilAlt
          className={styles.pencil}
          onClick={() => {
            setEditToggle(true);
          }}
        />
      ) : (
        <span />
      )}
    </div>
  );
};
