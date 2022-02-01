import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import RegisterForm from "../../forms/RegisterForm/RegisterForm";
import { signup } from "../../redux/actions/auth";
import styles from "./RegisterPage.module.css";

export const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e, formData, setError) => {
    e.preventDefault();

    const decimal =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;

    if (!formData.password.match(decimal)) {
      setError(
        "Password need to contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character"
      );
      return false;
    }
    dispatch(signup(formData, navigate));
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
