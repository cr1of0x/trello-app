import * as api from "../../api/index.js";
import { confirmemail, dashboard } from "../../routes.js";
import {
  AUTH,
  EMAIL,
  SHOW_LOADER,
  HIDE_LOADER,
} from "../constants/actionTypes.js";

export const signup = (formData, navigate, setErrors) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);

    dispatch({ type: EMAIL, data });

    navigate(confirmemail);
  } catch (error) {
    if (error.request.status === 422) {
      let message = error.response.data.error.details[0].message;
      let key = error.response.data.error.details[0].context.key;
      if (key === "login") {
        setErrors({ login: message });
      } else if (key === "email") {
        setErrors({ email: message });
      } else if (key === "password") {
        setErrors({ password: message });
      } else if (key === "confirmPassword") {
        setErrors({ confirmPassword: message });
      }
    } else {
      return error;
    }
  }
};

export const signin = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);

    dispatch({ type: AUTH, data });

    navigate(dashboard);
  } catch (error) {
    console.log(error);
  }
};
