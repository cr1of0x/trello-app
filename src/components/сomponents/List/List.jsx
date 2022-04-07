import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dragList } from "../../../redux/actions/actions";
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

  const handleCreateCard = (formData, onSucess, formName) => {
    const data = { list_id, dashboard_id, formData, formName };
    dispatch(createCard(data, onSucess));
  };

  const archiveList = () => {
    handleDelete(dashboard_id, list_id);
  };

  const archiveAllCards = () => {
    const data = { list_id, dashboard_id };
    dispatch(deleteAllCards(data));
  };

  const moveAllCardsToList = (list_to_id) => {
    const data = { list_from_id: list_id, list_to_id, cards, dashboard_id };
    dispatch(moveAllCards(data));
  };

  const handleCopyList = (formData, onSucess, formName) => {
    const data = { formData, cards, dashboard_id, formName };
    dispatch(copyOneList(data, onSucess));
  };

  const dragDropCardOnList = () => {
    const data = {
      card_id: draggedCard,
      list_from_id: draggedFromList,
      list_to_id: list_id,
      dashboard_id,
    };
    dispatch(dragAndDropCard(data));
  };

  const handleBlur = () => {
    if (titleName.length === 0) {
      setTitleName(title);
      setTitleToggle(false);
    } else {
      const data = { id: list_id, title: titleName };
      dispatch(editList(data));
      setTitleToggle(false);
    }
  };

  const dragStartListHandler = (e) => {
    e.target.classList.add(`${styles.hide}`);
    dispatch(dragList({ isList: true, list: list_id }));
  };

  const dragEndListHandler = (e) => {
    e.preventDefault();
    e.target.classList.remove(`${styles.hide}`);
    dispatch(dragList({ isList: false }));
  };

  const onDropListHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isList) {
      dragDropCardOnList();
    } else {
      const data = {
        draggedList: draggedFromList,
        listToDrop: list_id,
        dashboard_id,
      };
      dispatch(moveList(data));
    }
    dispatch(dragList({ isList: false }));
  };

  return (
    <div
      className={styles.wrapper}
      draggable={true}
      onDragStart={(e) => {
        dragStartListHandler(e);
      }}
      onDragEnd={(e) => {
        dragEndListHandler(e);
      }}
      onDragOver={(e) => {
        e.preventDefault();
      }}
      onDrop={(e) => {
        onDropListHandler(e);
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
              list_title={title}
              description={e.description}
            />
          );
        })}
      </div>
      <CardForm handleCancel={handleCancel} handleCreate={handleCreateCard} />
    </div>
  );
};
