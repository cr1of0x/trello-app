import * as api from "../../api/index.js";
import { errorsValidation } from "../../errorsValidation.js";
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from "../../routes.js";
import { auth, email, hideLoader, showLoader } from "../actions/actions.js";

export const signup = (formData, navigate, setErrors) => async (dispatch) => {
  try {
    dispatch(showLoader());
    const { data } = await api.signUp(formData);

    dispatch(email(data));
    dispatch(hideLoader());
    navigate(PUBLIC_ROUTES.confirmemail);
  } catch (error) {
    errorsValidation(error, setErrors);
    dispatch(hideLoader());
  }
};

export const signin = (formData, navigate, setErrors) => async (dispatch) => {
  try {
    dispatch(showLoader());
    const { data } = await api.signIn(formData);

    console.log(data);

    await dispatch(auth(data));
    dispatch(hideLoader());
    navigate(PRIVATE_ROUTES.dashboard);
  } catch (error) {
    errorsValidation(error, setErrors);
    dispatch(hideLoader());
  }
};

export const gmail = (gmailData, navigate, setErrors) => async (dispatch) => {
  try {
    dispatch(showLoader());
    const { data } = await api.gmail(gmailData);

    dispatch(email(data));
    navigate(PUBLIC_ROUTES.confirmemail);
    dispatch(hideLoader());
  } catch (error) {
    errorsValidation(error, setErrors);
    dispatch(hideLoader());
  }
};

export const gmailLogin =
  (gmailData, navigate, setErrors) => async (dispatch) => {
    try {
      dispatch(showLoader());
      const { data } = await api.gmailLogin(gmailData);

      await dispatch(auth(data));
      navigate(PRIVATE_ROUTES.dashboard);
      dispatch(hideLoader());
    } catch (error) {
      errorsValidation(error, setErrors);
      dispatch(hideLoader());
    }
  };
