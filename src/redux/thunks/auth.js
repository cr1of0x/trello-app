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

    console.log(data);

    await dispatch(auth(data));
    dispatch(hideLoader());
    navigate(dashboard);
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

export const gmail = (gmailData, navigate, setErrors) => async (dispatch) => {
  try {
    dispatch(showLoader());
    const { data } = await api.gmail(gmailData);

    dispatch(email(data));
    navigate(confirmemail);
    dispatch(hideLoader());
  } catch (error) {
    if (error.request.status === 422) {
      let message = error.response.data.error.details[0].message;
      let key = error.response.data.error.details[0].context.key;
      if (key === "email") {
        setErrors({ email: message });
      }
      dispatch(hideLoader());
    } else {
      dispatch(hideLoader());
      return error;
    }
  }
};

export const gmailLogin =
  (gmailData, navigate, setErrors) => async (dispatch) => {
    try {
      dispatch(showLoader());
      const { data } = await api.gmailLogin(gmailData);

      await dispatch(auth(data));
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
