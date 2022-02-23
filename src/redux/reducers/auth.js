import { AUTH, LOGOUT, EMAIL } from "../constants/actionTypes";

const initialState = {
  authData: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem("token", action.data);
      return { ...state, authData: action.data };
    case LOGOUT:
      localStorage.removeItem("token");
      return { ...state, authData: null };
    case EMAIL:
      return { ...state, authData: action?.data };
    default:
      return state;
  }
};

export default authReducer;
