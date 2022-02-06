import { useState } from "react";
import GoogleLogin from "react-google-login";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Input } from "../../сomponents/Input/Input";
import styles from "./LoginForm.module.css";

const initailState = {
  email: "",
  password: "",
};

export const LoginForm = ({ handleSubmit }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initailState);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const googleSucess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({ type: "AUTH", data: { result, token } });
      navigate("/dashboard");
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
        handleSubmit(e, formData);
      }}
    >
      <h2 className={styles.title}>Sign In</h2>

      <GoogleLogin
        className={styles.google}
        clientId="782945626586-3o5bloqn75gbklfkk1bmqt4ik6jd6uhv.apps.googleusercontent.com"
        buttonText=""
        on
        onSuccess={googleSucess}
        onFailure={googleFailure}
        cookiePolicy="single_host_origin"
      />

      <Input
        className={styles.input}
        name="email"
        type="email"
        onChange={(e) => {
          handleChange(e);
        }}
        wrapperClass={styles.inputgroup}
        highlightClass={styles.highlight}
        barClass={styles.bar}
        labelClass={styles.label}
        labelValue="Email"
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
      />

      <input className={styles.submit} type="submit" value="Sign In" />
    </form>
  );
};
