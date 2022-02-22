import styles from "./DeleteDashboardForm.module.css";

export const DeleteDashboardForm = ({
  setDeleteModalActive,
  id,
  handleDelete,
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
