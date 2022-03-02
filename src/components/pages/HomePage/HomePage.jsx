import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { Link } from "react-router-dom";

export const HomePage = () => {
  const [modalActive, setModalActive] = useState(false);
  const [deleteModalActive, setDeleteModalActive] = useState(false);
  const [dashboardId, setDashboardId] = useState("");
  const dispatch = useDispatch();
  const dashboards = useSelector((state) => state.dashboards.dashboards);
  const favoriteDashboards = dashboards.filter((e) => {
    return e.isFavorite;
  });

  const onSucess = () => {
    setModalActive(false);
    setDeleteModalActive(false);
  };

  const handleSubmit = (formData) => {
    dispatch(createDashboard(formData, onSucess));
  };

  const handleDelete = (id) => {
    dispatch(deleteDashboard(id, onSucess));
  };

  useEffect(() => {
    dispatch(gettingDashboards());
  }, []);

  return (
    <>
      <h2>Favorite dashboards</h2>
      <div className={styles.container}>
        {favoriteDashboards.length === 0 ? (
          <div>No favorite dashboards</div>
        ) : (
          favoriteDashboards.map((e) => {
            return (
              <Link key={e._id} to={`/b/${e._id}`}>
                <Dashboard
                  key={e._id}
                  id={e._id}
                  title={e.title}
                  isFavorite={e.isFavorite}
                  description={e.description}
                  setDeleteModalActive={setDeleteModalActive}
                  setDashboardId={setDashboardId}
                />
              </Link>
            );
          })
        )}
      </div>
      <h2>All dashboards</h2>
      <div className={styles.container}>
        {dashboards.length === 0 ? (
          <div>Create your first dashboard!</div>
        ) : (
          dashboards.map((e) => {
            return (
              <Link key={e._id} to={`/b/${e._id}`}>
                <Dashboard
                  key={e._id}
                  id={e._id}
                  title={e.title}
                  isFavorite={e.isFavorite}
                  description={e.description}
                  setDeleteModalActive={setDeleteModalActive}
                  setDashboardId={setDashboardId}
                />
              </Link>
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
          id={dashboardId}
          handleDelete={handleDelete}
        />
      </Modal>
    </>
  );
};
