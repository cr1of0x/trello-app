import { useState } from "react";
import styles from "./Dashboard.module.css";
import { FaTrashAlt } from "react-icons/fa";

export const Dashboard = ({ id, title, deleteClick, handleEdit }) => {
  const [titleName, setTitleName] = useState(title);
  const [titleToggle, setTitleToggle] = useState(false);
  const [deleteToggle, setDeleteToggle] = useState(false);

  return (
    <div
      className={styles.dashboard}
      onMouseOver={() => {
        setDeleteToggle(true);
      }}
      onMouseLeave={() => {
        setDeleteToggle(false);
      }}
    >
      {titleToggle ? (
        <input
          className={styles.titleinput}
          value={titleName}
          onChange={(e) => {
            setTitleName(e.target.value);
          }}
          onBlur={() => {
            handleEdit(id, titleName);
            setTitleToggle(false);
          }}
          autoFocus={true}
          maxLength={12}
          minLength={3}
        />
      ) : (
        <p
          onDoubleClick={() => {
            setTitleToggle(true);
          }}
          className={styles.title}
        >
          {titleName}
        </p>
      )}
      {deleteToggle ? (
        <FaTrashAlt
          className={styles.deletebutton}
          color="white"
          onClick={() => {
            deleteClick(id);
          }}
        />
      ) : (
        <span />
      )}
    </div>
  );
};
