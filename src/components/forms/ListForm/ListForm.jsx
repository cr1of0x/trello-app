import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { LIST_FORM } from "../../../helpers/formNames";
import styles from "./ListForm.module.css";

const initialState = {
  title: "",
};

export const ListForm = ({ handleCreate, handleCancel }) => {
  const [toggle, setToggle] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const lists = useSelector((state) => {
    return state.lists.lists;
  });
  const errors = useSelector((state) => state.errors.errors);
  const formName = useSelector((state) => state.errors.formName);

  const onSucess = () => {
    setToggle(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setFormData({ ...formData, formName: LIST_FORM });
  }, []);

  return (
    <div className={styles.container}>
      {toggle ? (
        <form
          className={styles.form}
          onSubmit={(e) => {
            e.preventDefault();
            handleCreate(formData, onSucess);
            setFormData({ ...formData, title: "" });
          }}
        >
          <input
            className={styles.title}
            name="title"
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <div className={styles.error}>
            {formName === LIST_FORM && errors.title}
          </div>
          <div className={styles.buttoncontainer}>
            <input className={styles.ok} type="submit" value="Add list" />

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
            className={styles.add}
            onClick={() => {
              setToggle(true);
            }}
          >
            {lists.length === 0 ? " + Add first list" : " + Add another list"}
          </button>
        </div>
      )}
    </div>
  );
};
