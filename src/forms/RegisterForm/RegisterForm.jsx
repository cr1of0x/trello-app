import styles from "./RegisterForm.module.css";
import { GoogleLogin } from "react-google-login";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Input } from "../../сomponents/Input/Input";

const initailState = {
  login: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const RegisterForm = ({ handleSubmit }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initailState);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const googleSucess = async (res) => {
    const result = res?.profileObj.email;
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
      className={styles.registerform}
      onSubmit={(e) => {
        handleSubmit(e, formData, setError);
      }}
    >
      <h2 className={styles.title}>Sigh In to Trello</h2>

      <GoogleLogin
        clientId="782945626586-3o5bloqn75gbklfkk1bmqt4ik6jd6uhv.apps.googleusercontent.com"
        buttonText=""
        className={styles.google}
        onSuccess={googleSucess}
        onFailure={googleFailure}
        cookiePolicy="single_host_origin"
      />

      <div className={styles.inputgroup}>
        <Input
          className={styles.input}
          name="login"
          type="login"
          onChange={(e) => {
            handleChange(e);
          }}
          minLength={5}
          maxLength={10}
        />
        <span className={styles.highlight}></span>
        <span className={styles.bar}></span>
        <label className={styles.label}>Login</label>
      </div>

      <div className={styles.inputgroup}>
        <Input
          className={styles.input}
          name="email"
          type="email"
          onChange={(e) => {
            handleChange(e);
          }}
        />
        <span className={styles.highlight}></span>
        <span className={styles.bar}></span>
        <label className={styles.label}>Email</label>
      </div>
      <div className={styles.inputgroup}>
        <Input
          className={styles.input}
          name="password"
          type="password"
          onChange={(e) => {
            handleChange(e);
          }}
          minLength={8}
          maxLength={15}
        />
        <span className={styles.highlight}></span>
        <span className={styles.bar}></span>
        <label className={styles.label}>Password</label>
      </div>

      <div className={styles.inputgroup}>
        <Input
          className={styles.input}
          name="confirmPassword"
          type="password"
          onChange={(e) => {
            handleChange(e);
          }}
          minLength={8}
          maxLength={15}
        />
        <span className={styles.highlight}></span>
        <span className={styles.bar}></span>
        <label className={styles.label}>Confirm Password</label>
      </div>
      <div className={styles.error}>{error}</div>
      <Input className={styles.submit} type="submit" value="SignUp" />
    </form>
  );
};

export default RegisterForm;
