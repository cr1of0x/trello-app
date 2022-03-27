import {
  AUTH,
  CREATE_DASHBOARD_TOAST,
  DELETE_DASHBOARD_TOAST,
  DRAG_CARD,
  EMAIL,
  HIDE_LOADER,
  LOGOUT,
  SET_CARDS,
  SET_DASHBOARDS,
  SET_FORM_ERRORS,
  SET_LISTS,
  SHOW_LOADER,
} from "../constants/actionTypes";

export const auth = (data) => {
  return {
    type: AUTH,
    data,
  };
};

export const email = (data) => {
  return { type: EMAIL, data: data };
};

export const showLoader = () => {
  return { type: SHOW_LOADER };
};

export const hideLoader = () => {
  return { type: HIDE_LOADER };
};

export const logout = () => {
  return { type: LOGOUT };
};

export const deleteDashboardToast = () => {
  return { type: DELETE_DASHBOARD_TOAST };
};

export const createDashboardToast = () => {
  return { type: CREATE_DASHBOARD_TOAST };
};

export const setFormErrors = (data, formName) => {
  return { type: SET_FORM_ERRORS, data: data, formName: formName };
};

export const setDashboards = (data) => {
  return { type: SET_DASHBOARDS, data: data };
};

export const setLists = (data) => {
  return { type: SET_LISTS, data: data };
};

export const setCards = (data) => {
  return { type: SET_CARDS, data: data };
};

export const dragCard = (data) => {
  return { type: DRAG_CARD, data: data };
};
