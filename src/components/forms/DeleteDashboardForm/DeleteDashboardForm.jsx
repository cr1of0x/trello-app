export const DeleteDashboardForm = ({
  handleDelete,
  setDeleteModalActive,
  id,
}) => {
  const handleCancel = () => {
    setDeleteModalActive(false);
  };

  return (
    <div>
      <button
        onClick={() => {
          handleDelete(id);
        }}
      >
        Delete
      </button>
      <button
        onClick={() => {
          handleCancel();
        }}
      >
        Cancel
      </button>
    </div>
  );
};
