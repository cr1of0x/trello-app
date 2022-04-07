import { useState } from "react";
import { useSelector } from "react-redux";
import { CARD_FORM } from "../../../helpers/formNames";
import styles from "./CardForm.module.css";

const initialState = {
  title: "",
  description: "",
};

export const CardForm = ({ handleCreate, handleCancel }) => {
  const [toggle, setToggle] = useState(false);
  const [formData, setFormData] = useState(initialState);

  const errors = useSelector((state) => state.errors.errors);
  const formName = useSelector((state) => state.errors.formName);

  const onSucess = () => {
    setToggle(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className={styles.container}>
      {toggle ? (
        <form
          className={styles.form}
          onSubmit={(e) => {
            e.preventDefault();
            handleCreate(formData, onSucess, CARD_FORM);
            setFormData({ ...formData, title: "" });
          }}
        >
          <input
            className={styles.title}
            name="title"
            onChange={(e) => {
              handleChange(e);
            }}
            placeholder="Enter a card name..."
          />
          <div className={styles.error}>
            {formName === CARD_FORM && errors.title}
          </div>
          <div className={styles.buttoncontainer}>
            <input className={styles.ok} type="submit" value="Add card" />

            <button
              className={styles.cancel}
              type="button"
              onClick={() => {
                handleCancel();
                setToggle(false);
                setFormData({ ...formData, title: "" });
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div>
          <button
            className={styles.cardbutton}
            onClick={() => {
              setToggle(true);
            }}
          >
            + Add card
          </button>
        </div>
      )}
    </div>
  );
};
