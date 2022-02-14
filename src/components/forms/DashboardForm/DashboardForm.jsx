import { useState } from "react";
import { useDispatch } from "react-redux";
import { createDashboard } from "../../../redux/thunks/dashboard";

const initialState = {
  title: "",
  description: "",
  token: localStorage.getItem("token"),
};

export const DashboardForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(createDashboard(formData));
  };

  return (
    <form
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      <input
        name="title"
        onChange={(e) => {
          handleChange(e);
        }}
      />
      <input
        name="description"
        onChange={(e) => {
          handleChange(e);
        }}
      />
      <input type="submit"></input>
    </form>
  );
};
