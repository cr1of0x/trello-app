import { useDispatch } from "react-redux";
import { deleteList } from "../../../redux/thunks/list";
import styles from "./List.module.css";

export const List = ({ title, dashboard_id, list_id }) => {
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(deleteList(dashboard_id, list_id));
  };

  return (
    <div>
      <div className={styles.container}>
        <div>{title}</div>
        <select
          className={styles.select}
          onChange={() => {
            handleDelete();
          }}
          defaultValue=""
        >
          <option value="" disabled hidden>
            ...
          </option>
          <option value="Archive list">Archive list</option>
        </select>
      </div>
      <button>Add card</button>
    </div>
  );
};
