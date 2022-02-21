import { useDispatch } from "react-redux";
import { deleteDashboard } from "../../../redux/thunks/dashboard";
import styles from "./DeleteDashboardForm.module.css";

export const DeleteDashboardForm = ({
  setDeleteModalActive,
  id,
  setDashboards,
}) => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const handleCancel = () => {
    setDeleteModalActive(false);
  };

  const handleDelete = () => {
    dispatch(deleteDashboard(id, setDashboards, token, setDeleteModalActive));
  };

  return (
    <>
      <div className={styles.formtitle}>Delete dashboard?</div>
      <div className={styles.buttoncontainer}>
        <button
          className={styles.button}
          onClick={() => {
            handleDelete();
          }}
        >
          Delete
        </button>
        <button
          className={styles.button}
          onClick={() => {
            handleCancel();
          }}
        >
          Cancel
        </button>
      </div>
    </>
  );
};
