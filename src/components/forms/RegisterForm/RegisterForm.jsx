import styles from "./RegisterForm.module.css";
import { GoogleLogin } from "react-google-login";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { gmail } from "../../../redux/thunks/auth";
import { Input } from "../../сomponents/Input/Input";

const initialState = {
  login: "",
  email: "",
  password: "",
  confirmPassword: "",
  type: "email",
};

const RegisterForm = ({ handleSubmit }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState(initialState);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const googleSucess = async (res) => {
    const data = {
      login: res?.profileObj.name,
      email: res?.profileObj.email,
      type: "google",
    };

    try {
      dispatch(gmail(data, navigate, setErrors));
    } catch (error) {
      console.log(error);
    }
  };
  const googleFailure = (error) => {
    console.log(error);
    console.log("Google Sign In was unsucessfull. Try Again Later");
  };

  return (
    <form
      className={styles.registerform}
      onSubmit={(e) => {
        handleSubmit(e, formData, setErrors);
      }}
    >
      <h2 className={styles.title}>Sign Up to Trello</h2>

      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_ID}
        buttonText=""
        className={styles.google}
        onSuccess={googleSucess}
        onFailure={googleFailure}
        cookiePolicy="single_host_origin"
      />

      <Input
        className={styles.input}
        name="login"
        type="login"
        onChange={(e) => {
          handleChange(e);
        }}
        wrapperClass={styles.inputgroup}
        highlightClass={styles.highlight}
        barClass={styles.bar}
        labelClass={styles.label}
        labelValue="Login"
        errorClass={styles.error}
        errorValue={errors.login}
      />

      <Input
        className={styles.input}
        name="email"
        onChange={(e) => {
          handleChange(e);
        }}
        wrapperClass={styles.inputgroup}
        highlightClass={styles.highlight}
        barClass={styles.bar}
        labelClass={styles.label}
        labelValue="Email"
        errorClass={styles.error}
        errorValue={errors.email}
      />

      <Input
        className={styles.input}
        name="password"
        type="password"
        onChange={(e) => {
          handleChange(e);
        }}
        wrapperClass={styles.inputgroup}
        highlightClass={styles.highlight}
        barClass={styles.bar}
        labelClass={styles.label}
        labelValue="Password"
        errorClass={styles.error}
        errorValue={errors.password}
      />

      <Input
        className={styles.input}
        name="confirmPassword"
        type="password"
        onChange={(e) => {
          handleChange(e);
        }}
        wrapperClass={styles.inputgroup}
        highlightClass={styles.highlight}
        barClass={styles.bar}
        labelClass={styles.label}
        labelValue="Confirm Password"
        errorClass={styles.error}
        errorValue={errors.confirmPassword}
      />

      <input className={styles.submit} type="submit" value="SignUp" />
    </form>
  );
};

export default RegisterForm;
