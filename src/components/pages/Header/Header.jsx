import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import styles from "./Header.module.css";
import { PUBLIC_ROUTES } from "../../../routes";
import { logout } from "../../../redux/actions/actions";

export const Header = () => {
  const [user, setUser] = useState(localStorage.getItem("token"));

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logout());
    setUser(null);
    navigate(PUBLIC_ROUTES.login);
  };

  useEffect(() => {
    setUser(localStorage.getItem("token"));
  }, [location]);

  return (
    <div className={styles.header}>
      <span className={styles.logo}>LOGO</span>
      {user ? (
        <button className={styles.button} onClick={handleLogout}>
          LogOut
        </button>
      ) : (
        <div className={styles.nav}>
          <Link to={PUBLIC_ROUTES.registration}>
            <button className={styles.button}>Sign Up</button>
          </Link>
          <Link to={PUBLIC_ROUTES.login}>
            <button className={styles.button}>Login</button>
          </Link>
        </div>
      )}
    </div>
  );
};
