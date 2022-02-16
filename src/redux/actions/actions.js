import {
  AUTH,
  CREATE,
  EMAIL,
  HIDE_LOADER,
  LOGOUT,
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

export const create = (data) => {
  return { type: CREATE, data };
};
