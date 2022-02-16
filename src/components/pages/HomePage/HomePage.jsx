import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getDashboards } from "../../../api";
import { createDashboard } from "../../../redux/thunks/dashboard";
import { DashboardForm } from "../../forms/DashboardForm/DashboardForm";
import { Dashboard } from "../../сomponents/Dashboard/Dashboard";
import { Modal } from "../../сomponents/Modal/Modal";
import styles from "./HomePage.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const HomePage = () => {
  const [dashboards, setDashboards] = useState([]);
  const [modalActive, setModalActive] = useState(false);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  const notify = () =>
    toast.success("Dashboard created sucessfully!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const gettingDashboards = async () => {
    const result = await getDashboards(token);
    const listOfDashboards = result.data;
    setDashboards(listOfDashboards);
  };

  const handleSubmit = (e, formData, setErrors) => {
    e.preventDefault();

    dispatch(
      createDashboard(
        formData,
        setModalActive,
        setErrors,
        gettingDashboards,
        notify
      )
    );
  };

  useEffect(() => {
    gettingDashboards();
  }, []);

  return (
    <>
      <div className={styles.container}>
        {dashboards.map((e) => {
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
        })}
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
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};
