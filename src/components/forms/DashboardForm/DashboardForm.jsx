import { useState } from "react";
import { useSelector } from "react-redux";
import { DASHBOARD_FORM } from "../../../helpers/formNames";
import { Input } from "../../сomponents/Input/Input";
import styles from "./DashboardForm.module.css";

const initialState = {
  title: "",
  description: "",
  isFavorite: false,
};

export const DashboardForm = ({ handleSubmit }) => {
  const [formData, setFormData] = useState(initialState);
  const errors = useSelector((state) => state.errors.errors);
  const formName = useSelector((state) => state.errors.formName);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form
      className={styles.dashboardform}
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(formData, DASHBOARD_FORM);
        setFormData({ ...formData, title: "", description: "" });
        e.target.reset();
      }}
    >
      <Input
        className={styles.input}
        name="title"
        onChange={(e) => {
          handleChange(e);
        }}
        wrapperClass={styles.inputgroup}
        highlightClass={styles.highlight}
        barClass={styles.bar}
        labelClass={styles.label}
        labelValue="Title"
        errorClass={styles.error}
        errorValue={formName === DASHBOARD_FORM && errors.title}
      />
      <Input
        className={styles.input}
        name="description"
        onChange={(e) => {
          handleChange(e);
        }}
        wrapperClass={styles.inputgroup}
        highlightClass={styles.highlight}
        barClass={styles.bar}
        labelClass={styles.label}
        labelValue="Description"
      />
      <input className={styles.submit} type="submit" value="Create Dashboard" />
    </form>
  );
};
