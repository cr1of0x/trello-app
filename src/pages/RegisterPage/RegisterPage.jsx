import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import RegisterForm from "../../forms/RegisterForm/RegisterForm";
import { signup } from "../../redux/actions/auth";
import styles from "./RegisterPage.module.css";

export const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e, formData, setError, errors) => {
    e.preventDefault();

    dispatch(signup(formData, navigate, setError));
  };
  return (
    <div className={styles.login}>
      <div className={styles.infoblock}>
        <h3 className={styles.info}>Already have account? You can Sign In</h3>
        <Link to="/login">
          <button className={styles.button}>Sign In</button>
        </Link>
      </div>
      <RegisterForm handleSubmit={handleSubmit} />
    </div>
  );
};
