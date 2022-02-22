import * as api from "../../api/index.js";
import { reduxErrorsValidation } from "../../reduxErrorsValidation.js";
import {
  hideLoader,
  showLoader,
  createDashboardToast,
  deleteDashboardToast,
} from "../actions/actions.js";

export const gettingDashboards = () => async (dispatch) => {
  try {
    dispatch(showLoader());
    const result = await api.getDashboards();
    const data = result.data;
    dispatch({ type: "SET_DASHBOARDS", data });
    dispatch(hideLoader());
  } catch (error) {
    dispatch(hideLoader());
    throw error;
  }
};

export const createDashboard =
  (formData, setModalActive) => async (dispatch) => {
    try {
      dispatch(showLoader());
      await api.dashboardCreate(formData);
      console.log(formData);
      await dispatch(gettingDashboards());
      dispatch(createDashboardToast());
      dispatch({ type: "SET_ERRORS", data: "" });
      setModalActive(false);
    } catch (error) {
      reduxErrorsValidation(error, dispatch, formData);
      dispatch(hideLoader());
    }
  };

export const deleteDashboard =
  (id, setDeleteModalActive) => async (dispatch) => {
    try {
      dispatch(showLoader());
      await api.deleteDashboard({ id });
      await dispatch(gettingDashboards());
      dispatch(deleteDashboardToast());
      setDeleteModalActive(false);
    } catch (error) {
      dispatch(hideLoader());
      throw error;
    }
  };

export const editDashboard = (id, title) => async (dispatch) => {
  try {
    await api.editDashboard({ id, title });
  } catch (error) {}
};
