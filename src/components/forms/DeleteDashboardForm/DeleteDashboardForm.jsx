import styles from "./DeleteDashboardForm.module.css";

export const DeleteDashboardForm = ({
  handleDelete,
  setDeleteModalActive,
  id,
}) => {
  const handleCancel = () => {
    setDeleteModalActive(false);
  };

  return (
    <>
      <div className={styles.formtitle}>Delete dashboard?</div>
      <div className={styles.buttoncontainer}>
        <button
          className={styles.button}
          onClick={() => {
            handleDelete(id);
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
