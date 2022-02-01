import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import styles from "./Header.module.css";

export const Header = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    setUser(null);
    navigate("/");
  };

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));
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
          <Link to="/registration">
            <button className={styles.button}>Sign Up</button>
          </Link>
          <Link to="/login">
            <button className={styles.button}>Login</button>
          </Link>
        </div>
      )}
    </div>
  );
};
