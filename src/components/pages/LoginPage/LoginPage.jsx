import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signin } from "../../../redux/thunks/auth";
import { PUBLIC_ROUTES } from "../../../routes";
import { LoginForm } from "../../forms/LoginForm/LoginForm";
import styles from "./LoginPage.module.css";

export const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e, formData, setErrors) => {
    e.preventDefault();

    dispatch(signin(formData, navigate, setErrors));
  };

  return (
    <div className={styles.login}>
      <LoginForm handleSubmit={handleSubmit} />
      <div className={styles.infoblock}>
        <h3 className={styles.info}>Don't have account? You can Sign Up</h3>
        <Link to={PUBLIC_ROUTES.registration}>
          <button className={styles.button}>Sign Up</button>
        </Link>
      </div>
    </div>
  );
};
