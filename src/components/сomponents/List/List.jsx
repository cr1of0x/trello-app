import { Dropdown } from "../DropDown/DropDown";
import styles from "./List.module.css";

export const List = ({ title, dashboard_id, list_id, handleDelete }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.title}>{title}</div>
        <Dropdown
          onClick={() => {
            handleDelete(dashboard_id, list_id);
          }}
          options={["Archive this list"]}
        />
      </div>
      <button className={styles.card}>+ Add a card</button>
    </div>
  );
};
