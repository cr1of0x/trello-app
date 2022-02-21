import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  createDashboard,
  deleteDashboard,
  gettingDashboards,
} from "../../../redux/thunks/dashboard";
import { DashboardForm } from "../../forms/DashboardForm/DashboardForm";
import { Dashboard } from "../../сomponents/Dashboard/Dashboard";
import { Modal } from "../../сomponents/Modal/Modal";
import styles from "./HomePage.module.css";
import { DeleteDashboardForm } from "../../forms/DeleteDashboardForm/DeleteDashboardForm";

export const HomePage = () => {
  const [dashboards, setDashboards] = useState([]);
  const [modalActive, setModalActive] = useState(false);
  const [deleteModalActive, setDeleteModalActive] = useState(false);
  const [dashboardId, setDashboardId] = useState("");
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  const handleSubmit = (e, formData, setErrors) => {
    e.preventDefault();

    dispatch(
      createDashboard(formData, setErrors, setModalActive, setDashboards, token)
    );
  };

  const deleteModal = (id) => {
    setDeleteModalActive(true);
    setDashboardId(id);
  };

  useEffect(() => {
    dispatch(gettingDashboards(token, setDashboards));
  }, [token, dispatch]);

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
                deleteClick={deleteModal}
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
      <Modal active={deleteModalActive} setActive={setDeleteModalActive}>
        <DeleteDashboardForm
          setDeleteModalActive={setDeleteModalActive}
          setDashboards={setDashboards}
          id={dashboardId}
        />
      </Modal>
    </>
  );
};
