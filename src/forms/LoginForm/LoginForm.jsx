import { useState } from "react";
import GoogleLogin from "react-google-login";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signin } from "../../actions/auth";
import styles from "./LoginForm.module.css";

export const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initailState = {
    email: "",
    password: "",
  };

  const [formData, setFormData] = useState(initailState);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(signin(formData, navigate));
  };

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
    <form className={styles.loginform} onSubmit={handleSubmit}>
      <label>E-mail</label>
      <input name="email" type="email" onChange={handleChange}></input>
      <label>Password</label>
      <input name="password" type="password" onChange={handleChange}></input>
      <input type="submit" value="Sign In"></input>
      <GoogleLogin
        clientId="782945626586-3o5bloqn75gbklfkk1bmqt4ik6jd6uhv.apps.googleusercontent.com"
        buttonText="Google Sign In"
        on
        onSuccess={googleSucess}
        onFailure={googleFailure}
        cookiePolicy="single_host_origin"
      />
    </form>
  );
};
