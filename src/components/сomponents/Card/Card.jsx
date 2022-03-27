import styles from "./Card.module.css";
import { FaPencilAlt } from "react-icons/fa";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dragAndDropCardOnCard, editCard } from "../../../redux/thunks/card";
import { dragCard } from "../../../redux/actions/actions";
import { moveList } from "../../../redux/thunks/list";

export const Card = ({
  title,
  id,
  list_id,
  dragged_card,
  dashboard_id,
  draggedFromList,
}) => {
  const [iconToggle, setIconToggle] = useState(false);
  const [editToggle, setEditToggle] = useState(false);
  const [titleName, setTitleName] = useState(title);
  const [pl, setPl] = useState(false);
  const isList = useSelector((state) => state.dragDrop.isList);

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
      className={styles.container}
      onDragEnter={(e) => {
        if (!isList) {
          e.preventDefault();
          setPl(true);
        }
      }}
      onDragLeave={(event) => {
        if (!isList) {
          if (event.currentTarget.contains(event.relatedTarget)) return;
          setPl(false);
        }
      }}
      draggable={true}
      onDragEnd={(e) => {
        e.target.classList.remove(`${styles.hide}`);
        setPl(false);
      }}
      onDragStart={(e) => {
        e.stopPropagation();
        dispatch(dragCard({ card: id, list: list_id, isList: false }));
        e.target.classList.add(`${styles.hide}`);
      }}
      onDrop={(e) => {
        e.stopPropagation();
        if (!isList) {
          dispatch(
            dragAndDropCardOnCard(
              dragged_card,
              id,
              draggedFromList,
              list_id,
              dashboard_id
            )
          );
          setPl(false);
        } else {
          dispatch(moveList(draggedFromList, list_id, dashboard_id));
        }
      }}
    >
      <div className={pl ? styles.placeholder : styles.hideplaceholder} />
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
    </div>
  );
};
