import {
  CREATE_DASHBOARD_TOAST,
  DELETE_DASHBOARD_TOAST,
} from "../constants/actionTypes";

const initialState = {
  notifyMessage: "",
};

const toastReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_DASHBOARD_TOAST:
      return { notifyMessage: "Dashboard sucessfully created!" };
    case DELETE_DASHBOARD_TOAST:
      return { notifyMessage: "Dashboard was deleted!" };
    default:
      return state;
  }
};

export default toastReducer;
