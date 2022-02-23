import axios from "axios";
import {
  DASHBOARD_CREATE_URL,
  DASHBOARD_DELETE_URL,
  DASHBOARD_EDIT_URL,
  DASHBOARD_GET_URL,
  GMAIL_LOGIN_URL,
  GMAIL_URL,
  SIGNIN_URL,
  SIGNUP_URL,
} from "./urls";

const API = axios.create({ baseURL: "http://localhost:5000" });
const token = localStorage.getItem("token");

export const signUp = (formData) => API.post(SIGNUP_URL, formData);
export const signIn = (formData) => API.post(SIGNIN_URL, formData);
export const gmail = (gmailData) => API.post(GMAIL_URL, gmailData);
export const gmailLogin = (gmailData) => API.post(GMAIL_LOGIN_URL, gmailData);
export const dashboardCreate = (formData) =>
  API.post(DASHBOARD_CREATE_URL, formData, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
export const getDashboards = () =>
  API.get(DASHBOARD_GET_URL, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
export const deleteDashboard = (id) =>
  API.post(DASHBOARD_DELETE_URL, id, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

export const editDashboard = (id) =>
  API.post(DASHBOARD_EDIT_URL, id, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
