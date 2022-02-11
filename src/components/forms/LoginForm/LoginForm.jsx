import { useState } from "react";
import GoogleLogin from "react-google-login";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { gmailLogin } from "../../../redux/thunks/auth";
import { Input } from "../../сomponents/Input/Input";
import styles from "./LoginForm.module.css";

const initialState = {
  email: "",
  password: "",
};

export const LoginForm = ({ handleSubmit }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState(initialState);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const googleSucess = async (res) => {
    const result = res?.profileObj;

    try {
      dispatch(gmailLogin(result, navigate, setErrors));
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
      className={styles.loginform}
      onSubmit={(e) => {
        handleSubmit(e, formData, setErrors);
      }}
    >
      <h2 className={styles.title}>Sign In</h2>

      <GoogleLogin
        className={styles.google}
        clientId={process.env.REACT_APP_GOOGLE_ID}
        buttonText=""
        on
        onSuccess={googleSucess}
        onFailure={googleFailure}
        cookiePolicy="single_host_origin"
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

      <input className={styles.submit} type="submit" value="Sign In" />
    </form>
  );
};
