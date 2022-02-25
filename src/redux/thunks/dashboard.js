import * as api from "../../api/index.js";
import { reduxErrorsValidation } from "../../helpers/reduxErrorsValidation.js";
import {
  hideLoader,
  showLoader,
  createDashboardToast,
  deleteDashboardToast,
  setFormErrors,
  setDashboards,
} from "../actions/actions.js";

export const onSubmit = () => async (dispatch) => {
  try {
    dispatch(setFormErrors("", ""));
    dispatch(hideLoader());
  } catch (error) {
    dispatch(hideLoader());
    throw error;
  }
};

export const gettingDashboards = () => async (dispatch) => {
  try {
    dispatch(showLoader());
    const result = await api.getDashboards();
    const data = result.data;
    await dispatch(setDashboards(data));
    dispatch(hideLoader());
  } catch (error) {
    dispatch(hideLoader());
    throw error;
  }
};

export const createDashboard = (formData, onSucess) => async (dispatch) => {
  try {
    dispatch(showLoader());
    await api.dashboardCreate(formData);
    await dispatch(gettingDashboards());
    dispatch(createDashboardToast());
    dispatch(onSubmit());
    onSucess();
  } catch (error) {
    reduxErrorsValidation(error, dispatch, formData);
    dispatch(hideLoader());
  }
};

export const deleteDashboard = (id, onSucess) => async (dispatch) => {
  try {
    dispatch(showLoader());
    await api.deleteDashboard({ id });
    await dispatch(gettingDashboards());
    dispatch(deleteDashboardToast());
    onSucess();
  } catch (error) {
    dispatch(hideLoader());
    throw error;
  }
};

export const editDashboard = (id, title) => async (dispatch) => {
  try {
    await api.editDashboard({ id, title });
  } catch (error) {
    throw error;
  }
};

export const addFavorite = (id, boolean) => async (dispatch) => {
  try {
    await api.favoriteDashboard({ id, boolean });
    await dispatch(gettingDashboards());
  } catch (error) {
    throw error;
  }
};
