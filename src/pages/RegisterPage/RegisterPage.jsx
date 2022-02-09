import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import RegisterForm from "../../forms/RegisterForm/RegisterForm";
import { signup } from "../../redux/thunks/auth";
import styles from "./RegisterPage.module.css";

export const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e, formData, setErrors) => {
    e.preventDefault();

    dispatch(signup(formData, navigate, setErrors));
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