import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteDashboard, getDashboards } from "../../../api";
import { createDashboard } from "../../../redux/thunks/dashboard";
import { DashboardForm } from "../../forms/DashboardForm/DashboardForm";
import { Dashboard } from "../../сomponents/Dashboard/Dashboard";
import { Modal } from "../../сomponents/Modal/Modal";
import styles from "./HomePage.module.css";
import "react-toastify/dist/ReactToastify.css";
import { hideLoader, showLoader } from "../../../redux/actions/actions";
import { notify } from "../../../helpers/notify";

export const HomePage = () => {
  const [dashboards, setDashboards] = useState([]);
  const [modalActive, setModalActive] = useState(false);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  const gettingDashboards = async () => {
    dispatch(showLoader());
    const result = await getDashboards(token);
    const listOfDashboards = result.data;
    setDashboards(listOfDashboards);
    dispatch(hideLoader());
  };

  const onSucess = () => {
    setModalActive(false);
    gettingDashboards();
    dispatch(hideLoader());
    notify("Dashboard created sucessfully!");
  };

  const handleSubmit = (e, formData, setErrors) => {
    e.preventDefault();

    dispatch(createDashboard(formData, setErrors, onSucess));
  };

  const deleteClick = async (id) => {
    await deleteDashboard({ id });
  };

  useEffect(() => {
    gettingDashboards();
  }, []);

  return (
    <>
      <div className={styles.container}>
        {dashboards.length === 0 ? (
          <div>Create your first dashboard!</div>
        ) : (
          dashboards.map((e) => {
            return (
              <Dashboard
                key={e._id}
                id={e._id}
                title={e.title}
                description={e.description}
                className={styles.dashboard}
                titleClassName={styles.title}
                descriptionClassName={styles.description}
                deleteClick={deleteClick}
              />
            );
          })
        )}
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
