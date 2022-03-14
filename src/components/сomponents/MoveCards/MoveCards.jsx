import styles from "./MoveCards.module.css";

export const MoveCards = ({ setMoveCards, lists, handleMove, list_id }) => {
  return (
    <div className={styles.content}>
      {lists.map((list) =>
        list._id === list_id ? (
          <div key={list._id} className={styles.current}>
            {list.title} (current)
          </div>
        ) : (
          <div
            key={list._id}
            onClick={(e) => {
              handleMove(list._id);
              setMoveCards(false);
            }}
            className={styles.contentitem}
          >
            {list.title}
          </div>
        )
      )}
    </div>
  );
};
