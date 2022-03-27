import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createCard,
  deleteAllCards,
  dragAndDropCard,
  moveAllCards,
} from "../../../redux/thunks/card";
import { copyOneList, editList, moveList } from "../../../redux/thunks/list";
import { CardForm } from "../../forms/CardForm/CardForm";
import { CopyListForm } from "../../forms/CopyListForm/CopyListForm";
import { Card } from "../Card/Card";
import { Dropdown } from "../DropDown/DropDown";
import { Modal } from "../Modal/Modal";
import { MoveCards } from "../MoveCards/MoveCards";
import styles from "./List.module.css";

export const List = ({
  title,
  dashboard_id,
  list_id,
  handleDelete,
  cards,
  handleCancel,
  lists,
}) => {
  const [titleToggle, setTitleToggle] = useState(false);
  const [titleName, setTitleName] = useState(title);
  const [moveCards, setMoveCards] = useState(false);
  const [copyList, setCopyList] = useState(false);
  const draggedCard = useSelector((state) => state.dragDrop.card);
  const draggedFromList = useSelector((state) => state.dragDrop.list);
  const isList = useSelector((state) => state.dragDrop.isList);
  const dispatch = useDispatch();

  const handleCreateCard = (title, onSucess, formName) => {
    dispatch(createCard(list_id, dashboard_id, title, onSucess, formName));
  };

  const archiveList = () => {
    handleDelete(dashboard_id, list_id);
  };

  const archiveAllCards = () => {
    dispatch(deleteAllCards(list_id, dashboard_id));
  };

  const moveAllCardsToList = (list_to_id) => {
    dispatch(moveAllCards(list_id, list_to_id, cards, dashboard_id));
  };

  const handleCopyList = (formData, onSucess, formName) => {
    dispatch(copyOneList(formData, cards, dashboard_id, onSucess, formName));
  };

  const dragDropCardOnList = () => {
    dispatch(
      dragAndDropCard(draggedCard, draggedFromList, list_id, dashboard_id)
    );
  };

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
    <div
      className={styles.wrapper}
      draggable={true}
      onDragStart={(e) => {
        e.stopPropagation();
        e.target.classList.add(`${styles.hide}`);
        dispatch({ type: "DRAG_LIST", data: { isList: true, list: list_id } });
      }}
      onDragEnd={(e) => {
        e.preventDefault();
        e.target.classList.remove(`${styles.hide}`);
        dispatch({ type: "DRAG_LIST", data: { isList: false } });
      }}
      onDragOver={(e) => {
        e.preventDefault();
      }}
      onDrop={(e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!isList) {
          dragDropCardOnList();
        } else {
          dispatch(moveList(draggedFromList, list_id, dashboard_id));
        }
        dispatch({
          type: "DRAG_LIST",
          data: { isList: false },
        });
      }}
    >
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
          options={[
            { title: "Archive this list", onClick: archiveList },
            {
              title: "Move all cards in this list",
              onClick: () => {
                setMoveCards(true);
              },
            },
            { title: "Archive all cards", onClick: archiveAllCards },
            {
              title: "Copy list",
              onClick: () => {
                setCopyList(true);
              },
            },
          ]}
        />
      </div>
      <Modal active={moveCards} setActive={setMoveCards}>
        <MoveCards
          lists={lists}
          handleMove={moveAllCardsToList}
          list_id={list_id}
          setMoveCards={setMoveCards}
        />
      </Modal>
      <Modal active={copyList} setActive={setCopyList}>
        <CopyListForm
          title={titleName}
          handleCopyList={handleCopyList}
          setCopyList={setCopyList}
          handleCancel={handleCancel}
        />
      </Modal>

      <div className={styles.cardscontainer}>
        <div className={styles.cardplaceholder}></div>
        {cards.map((e) => {
          return (
            <Card
              title={e.title}
              key={e._id}
              id={e._id}
              list_id={list_id}
              dragged_card={draggedCard}
              draggedFromList={draggedFromList}
              dashboard_id={dashboard_id}
            />
          );
        })}
      </div>
      <CardForm handleCancel={handleCancel} handleCreate={handleCreateCard} />
    </div>
  );
};
