import { useState } from "react";
import styles from "./Dashboard.module.css";
import { FaTrashAlt, FaStar, FaRegStar } from "react-icons/fa";
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
          onDoubleClick={(e) => {
            e.preventDefault();
            setTitleToggle(true);
          }}
          onClick={(e) => {
            e.preventDefault();
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
            onClick={(e) => {
              e.preventDefault();
              setId();
            }}
          />
        ) : (
          <span />
        )}
        {deleteToggle || isFavorite ? (
          <>
            {isFavorite ? (
              <FaStar
                onClick={(e) => {
                  e.preventDefault();
                  handleFavorite(id);
                }}
                className={styles.favoritebutton}
                color="white"
              />
            ) : (
              <FaRegStar
                color="white"
                onClick={(e) => {
                  e.preventDefault();
                  handleFavorite(id);
                }}
                className={styles.favoritebutton}
              />
            )}
          </>
        ) : (
          <span />
        )}
      </div>
    </div>
  );
};
