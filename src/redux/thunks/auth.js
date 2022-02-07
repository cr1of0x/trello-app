import * as api from "../../api/index.js";
import { confirmemail, dashboard } from "../../routes.js";
import { auth, email, hideLoader, showLoader } from "../actions/actions.js";

export const signup = (formData, navigate, setErrors) => async (dispatch) => {
  try {
    dispatch(showLoader());
    const { data } = await api.signUp(formData);

    dispatch(email(data));
    dispatch(hideLoader());
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
      dispatch(hideLoader());
    } else {
      dispatch(hideLoader());
      return error;
    }
  }
};

export const signin = (formData, navigate, setErrors) => async (dispatch) => {
  try {
    dispatch(showLoader());
    const { data } = await api.signIn(formData);

    dispatch(auth(data));
    navigate(dashboard);
    dispatch(hideLoader());
  } catch (error) {
    if (error.request.status === 422) {
      let message = error.response.data.error.details[0].message;
      let key = error.response.data.error.details[0].context.key;
      if (key === "email") {
        setErrors({ email: message });
      } else if (key === "password") {
        setErrors({ password: message });
      }
      dispatch(hideLoader());
    } else {
      dispatch(hideLoader());
      return error;
    }
  }
};
