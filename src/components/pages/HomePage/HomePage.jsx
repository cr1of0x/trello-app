import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getDashboards } from "../../../api";
import { createDashboard } from "../../../redux/thunks/dashboard";
import { DashboardForm } from "../../forms/DashboardForm/DashboardForm";
import { Dashboard } from "../../сomponents/Dashboard/Dashboard";
import { Modal } from "../../сomponents/Modal/Modal";
import styles from "./HomePage.module.css";

export const HomePage = () => {
  const [dashboards, setDashboards] = useState([]);
  const [modalActive, setModalActive] = useState(false);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  const gettingDashboards = async () => {
    const result = await getDashboards(token);
    const listOfDashboards = result.data;
    setDashboards(
      listOfDashboards.map((e) => {
        return (
          <Dashboard
            key={e._id}
            title={e.title}
            description={e.description}
            className={styles.dashboard}
            titleClassName={styles.title}
            descriptionClassName={styles.description}
          />
        );
      })
    );
  };

  const handleSubmit = (e, formData) => {
    e.preventDefault();

    dispatch(createDashboard(formData));
    setModalActive(false);
  };

  useEffect(() => {
    return gettingDashboards();
  }, []);

  return (
    <>
      <div className={styles.container}>
        {dashboards}
        <button
          className={styles.newdashboard}
          onClick={() => {
            setModalActive(true);
          }}
        >
          New Dashboard
        </button>
      </div>
      <Modal active={modalActive} setActive={setModalActive}>
        <DashboardForm handleSubmit={handleSubmit} />
      </Modal>
    </>
  );
};
