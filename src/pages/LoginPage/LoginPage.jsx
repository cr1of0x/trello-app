import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { LoginForm } from "../../forms/LoginForm/LoginForm";
import { signin } from "../../redux/actions/auth";
import styles from "./LoginPage.module.css";

export const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e, formData) => {
    e.preventDefault();

    dispatch(signin(formData, navigate));
  };

  return (
    <div className={styles.login}>
      <LoginForm handleSubmit={handleSubmit} />
      <div className={styles.infoblock}>
        <h3 className={styles.info}>Don't have account? You can Sign Up</h3>
        <Link to="/registration">
          <button className={styles.button}>Sign Up</button>
        </Link>
      </div>
    </div>
  );
};
