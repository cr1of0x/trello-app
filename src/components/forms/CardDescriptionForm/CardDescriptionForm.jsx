import styles from "./CardDescriptionForm.module.css";

export const CardDescriptionForm = ({
  setDescriptToogle,
  setDescriptionText,
  descriptionText,
  handleSubmit,
  description,
}) => {
  const handleChange = (e) => {
    setDescriptionText(e.target.value);
  };
  return (
    <form
      className={styles.form}
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(descriptionText);
        setDescriptToogle(false);
      }}
    >
      <textarea
        className={styles.description}
        name="description"
        onChange={(e) => {
          handleChange(e);
        }}
        value={descriptionText}
        autoFocus={true}
        placeholder="Add a more detailed description..."
      />
      <div className={styles.buttoncontainer}>
        <input className={styles.ok} type="submit" value="Save" />

        <button
          className={styles.cancel}
          type="button"
          onClick={() => {
            setDescriptToogle(false);
            setDescriptionText(description);
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};
