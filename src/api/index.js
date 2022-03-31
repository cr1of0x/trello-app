import axios from "axios";
import {
  ADD_FAVORITE_DASHBOARD_URL,
  CARD_CREATE_URL,
  CARD_DELETE_ALL_URL,
  CARD_DND_ANOTHER_LIST_URL,
  CARD_DND_SAME_LIST_URL,
  CARD_DRAG_AND_DROP_URL,
  CARD_EDIT_DESCRIPTION_URL,
  CARD_EDIT_URL,
  CARD_MOVE_ALL_URL,
  DASHBOARD_CREATE_URL,
  DASHBOARD_DELETE_URL,
  DASHBOARD_EDIT_URL,
  DASHBOARD_GET_URL,
  GMAIL_LOGIN_URL,
  GMAIL_URL,
  LIST_COPY_URL,
  LIST_CREATE_URL,
  LIST_DELETE_URL,
  LIST_EDIT_URL,
  LIST_GET_URL,
  LIST_MOVE_URL,
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

export const editDashboard = (data) =>
  API.post(DASHBOARD_EDIT_URL, data, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

export const favoriteDashboard = (data) =>
  API.post(ADD_FAVORITE_DASHBOARD_URL, data, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

export const createList = (data) =>
  API.post(LIST_CREATE_URL, data, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

export const getLists = (data) =>
  API.get(LIST_GET_URL, {
    headers: {
      Authorization: "Bearer " + token,
      Dashboard: data,
    },
  });

export const deleteList = (id) =>
  API.post(LIST_DELETE_URL, id, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

export const editList = (data) =>
  API.post(LIST_EDIT_URL, data, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

export const cardCreate = (formData) =>
  API.post(CARD_CREATE_URL, formData, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

export const editCard = (data) =>
  API.post(CARD_EDIT_URL, data, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

export const deleteAllCards = (id) =>
  API.post(CARD_DELETE_ALL_URL, id, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

export const moveAllCards = (data) =>
  API.post(CARD_MOVE_ALL_URL, data, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

export const copyList = (data) =>
  API.post(LIST_COPY_URL, data, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

export const dragDropCard = (data) =>
  API.post(CARD_DRAG_AND_DROP_URL, data, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

export const dragDropCardSameList = (data) =>
  API.post(CARD_DND_SAME_LIST_URL, data, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

export const dragDropCardAnotherList = (data) =>
  API.post(CARD_DND_ANOTHER_LIST_URL, data, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

export const moveList = (data) =>
  API.post(LIST_MOVE_URL, data, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

export const editCardDescription = (data) =>
  API.post(CARD_EDIT_DESCRIPTION_URL, data, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
