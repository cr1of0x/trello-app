import { useState } from "react";
import { Input } from "../../сomponents/Input/Input";
import styles from "./DashboardForm.module.css";

const initialState = {
  title: "",
  description: "",
};

export const DashboardForm = ({ handleSubmit }) => {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState(initialState);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form
      className={styles.dashboardform}
      onSubmit={(e) => {
        handleSubmit(e, formData, setErrors);
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
        errorValue={errors.title}
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
