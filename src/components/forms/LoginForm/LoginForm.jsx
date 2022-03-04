import { useEffect, useState } from "react";
import GoogleLogin from "react-google-login";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LOGIN_FORM } from "../../../helpers/formNames";
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
  const errors = useSelector((state) => state.errors.errors);
  const formName = useSelector((state) => state.errors.formName);

  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    setFormData({ ...formData, formName: LOGIN_FORM });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const googleSucess = async (res) => {
    const result = res?.profileObj;

    try {
      dispatch(gmailLogin({ ...result, formName: LOGIN_FORM }, navigate));
    } catch (error) {
      throw error;
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
        errorValue={formName === LOGIN_FORM && errors.email}
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
        errorValue={formName === LOGIN_FORM && errors.password}
      />

      <input className={styles.submit} type="submit" value="Sign In" />
    </form>
  );
};
