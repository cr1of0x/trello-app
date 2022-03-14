import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { COPY_LIST_FORM } from "../../../helpers/formNames";
import styles from "./CopyListForm.module.css";

const initialState = {
  title: "",
};

export const CopyListForm = ({ title, handleCopyList, setCopyList }) => {
  const [formData, setFormData] = useState(initialState);

  const errors = useSelector((state) => state.errors.errors);
  const formName = useSelector((state) => state.errors.formName);

  const onSucess = () => {
    setCopyList(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setFormData({ ...formData, title, formName: COPY_LIST_FORM });
  }, []);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleCopyList(formData, onSucess);
        setFormData({ ...formData, title });
      }}
      className={styles.form}
    >
      <input
        name="title"
        value={formData.title}
        onChange={(e) => {
          handleChange(e);
        }}
        className={styles.title}
      />
      <div className={styles.error}>
        {formName === COPY_LIST_FORM && errors.title}
      </div>
      <input type="submit" value="Copy list" className={styles.button} />
    </form>
  );
};
