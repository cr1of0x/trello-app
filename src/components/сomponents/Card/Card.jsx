import styles from "./Card.module.css";
import { FaPencilAlt } from "react-icons/fa";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dragAndDropCardOnCard, editCard } from "../../../redux/thunks/card";
import { dragCard } from "../../../redux/actions/actions";
import { moveList } from "../../../redux/thunks/list";
import { Modal } from "../Modal/Modal";
import { CardDetails } from "../CardDetails/CardDetails";

export const Card = ({
  title,
  id,
  list_id,
  dragged_card,
  dashboard_id,
  draggedFromList,
  list_title,
  description,
}) => {
  const [iconToggle, setIconToggle] = useState(false);
  const [editToggle, setEditToggle] = useState(false);
  const [titleName, setTitleName] = useState(title);
  const [placeholder, setPlaceholder] = useState(false);
  const [details, setDetails] = useState(false);
  const isList = useSelector((state) => state.dragDrop.isList);
  const dispatch = useDispatch();

  const handleBlur = () => {
    if (titleName.length === 0) {
      setTitleName(title);
      setEditToggle(false);
    } else {
      const data = { id, title: titleName };
      dispatch(editCard(data));
      setEditToggle(false);
    }
  };

  const dragEnterCardHandler = (e) => {
    if (!isList) {
      e.preventDefault();
      setPlaceholder(true);
    }
  };

  const dragLeaveCardHandler = (e) => {
    if (!isList) {
      if (e.currentTarget.contains(e.relatedTarget)) return;
      setPlaceholder(false);
    }
  };

  const dragEndCardHandler = (e) => {
    e.target.classList.remove(`${styles.hide}`);
    setPlaceholder(false);
  };

  const dragStartCardHandler = (e) => {
    e.stopPropagation();
    dispatch(dragCard({ card: id, list: list_id, isList: false }));
    e.target.classList.add(`${styles.hide}`);
  };

  const onDropCardHandler = (e) => {
    e.stopPropagation();
    if (!isList) {
      const data = {
        dragged_card_id: dragged_card,
        top_card_id: id,
        list_from_id: draggedFromList,
        list_to_id: list_id,
        dashboard_id,
      };
      dispatch(dragAndDropCardOnCard(data));
      setPlaceholder(false);
    } else {
      const data = {
        draggedList: draggedFromList,
        listToDrop: list_id,
        dashboard_id,
      };
      dispatch(moveList(data));
    }
  };

  return (
    <>
      <div
        className={styles.container}
        onDragEnter={(e) => {
          dragEnterCardHandler(e);
        }}
        onDragLeave={(e) => {
          dragLeaveCardHandler(e);
        }}
        draggable={true}
        onDragEnd={(e) => {
          dragEndCardHandler(e);
        }}
        onDragStart={(e) => {
          dragStartCardHandler(e);
        }}
        onDrop={(e) => {
          onDropCardHandler(e);
        }}
        onClick={(e) => {
          setDetails(true);
        }}
      >
        <div
          className={placeholder ? styles.placeholder : styles.hideplaceholder}
        />
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
              onClick={(e) => {
                e.stopPropagation();
                setEditToggle(true);
              }}
            />
          ) : (
            <span />
          )}
        </div>
      </div>
      <Modal active={details} setActive={setDetails}>
        <CardDetails
          title={title}
          titleName={titleName}
          setTitleName={setTitleName}
          id={id}
          list_title={list_title}
          description={description}
          dashboard_id={dashboard_id}
        />
      </Modal>
    </>
  );
};
