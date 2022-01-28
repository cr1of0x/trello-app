import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signup } from "../actions/auth";
import { LoginForm } from "../forms/LoginForm/LoginForm";

export const LoginPage = () => {
  return (
    <LoginForm
    // formData={formData}
    // setFormData={setFormData}
    // handleSubmit={handleSubmit}
    />
  );
};
