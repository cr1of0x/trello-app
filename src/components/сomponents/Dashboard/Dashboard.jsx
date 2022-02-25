import { useState } from "react";
import styles from "./Dashboard.module.css";
import { FaTrashAlt, FaStar } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addFavorite, editDashboard } from "../../../redux/thunks/dashboard";

export const Dashboard = ({
  id,
  title,
  setDeleteModalActive,
  setDashboardId,
  isFavorite,
}) => {
  const [titleName, setTitleName] = useState(title);
  const [titleToggle, setTitleToggle] = useState(false);
  const [deleteToggle, setDeleteToggle] = useState(false);
  const dispatch = useDispatch();

  const handleBlur = () => {
    if (titleName.length === 0) {
      setTitleName(title);
      setTitleToggle(false);
    } else {
      dispatch(editDashboard(id, titleName));
      setTitleToggle(false);
    }
  };

  const setId = () => {
    setDeleteModalActive(true);
    setDashboardId(id);
  };

  const handleFavorite = (id) => {
    if (!isFavorite) {
      dispatch(addFavorite(id, true));
    } else {
      dispatch(addFavorite(id, false));
    }
  };

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
            handleBlur();
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
      <div className={styles.iconscontainer}>
        {deleteToggle ? (
          <FaTrashAlt
            className={styles.deletebutton}
            color="white"
            onClick={() => {
              setId();
            }}
          />
        ) : (
          <span />
        )}
        {deleteToggle || isFavorite ? (
          <FaStar
            onClick={() => {
              handleFavorite(id);
            }}
            className={styles.favoritebutton}
            color="white"
          />
        ) : (
          <span />
        )}
      </div>
    </div>
  );
};
