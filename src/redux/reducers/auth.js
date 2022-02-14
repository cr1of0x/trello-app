import {
  AUTH,
  LOGOUT,
  EMAIL,
  SHOW_LOADER,
  HIDE_LOADER,
} from "../constants/actionTypes";

const authReducer = (state = { authData: null, loading: false }, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem("token", action.data);
      return { ...state, authData: action?.data };
    case LOGOUT:
      localStorage.removeItem("token");
      return { ...state, authData: null };
    case EMAIL:
      return { ...state, authData: action?.data };
    case SHOW_LOADER:
      return { ...state, loading: true };
    case HIDE_LOADER:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default authReducer;
