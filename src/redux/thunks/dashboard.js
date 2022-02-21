import * as api from "../../api/index.js";
import { errorsValidation } from "../../errorsValidation.js";
import {
  hideLoader,
  showLoader,
  createDashboardToast,
  deleteDashboardToast,
} from "../actions/actions.js";

export const gettingDashboards = (token, setDashboards) => async (dispatch) => {
  try {
    dispatch(showLoader());
    const result = await api.getDashboards(token);
    const listOfDashboards = result.data;
    await setDashboards(listOfDashboards);
    dispatch(hideLoader());
  } catch (error) {
    console.log(error);
    dispatch(hideLoader());
  }
};

export const createDashboard =
  (formData, setErrors, setModalActive, setDashboards, token) =>
  async (dispatch) => {
    try {
      dispatch(showLoader());
      await api.dashboardCreate(formData);
      await dispatch(gettingDashboards(token, setDashboards));
      dispatch(createDashboardToast());
      setModalActive(false);
    } catch (error) {
      errorsValidation(error, setErrors);
      dispatch(hideLoader());
    }
  };

export const deleteDashboard =
  (id, setDashboards, token, setDeleteModalActive) => async (dispatch) => {
    try {
      dispatch(showLoader());
      await api.deleteDashboard({ id });
      await dispatch(gettingDashboards(token, setDashboards));
      dispatch(deleteDashboardToast());
      setDeleteModalActive(false);
    } catch (error) {
      console.log(error);
      dispatch(hideLoader());
    }
  };

export const editDashboard = (id, title) => async (dispatch) => {
  try {
    await api.editDashboard({ id, title });
  } catch (error) {}
};
