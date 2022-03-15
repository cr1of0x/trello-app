import * as api from "../../api/index.js";
import { reduxErrorsValidation } from "../../helpers/reduxErrorsValidation.js";
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from "../../routes.js";
import { auth, email, hideLoader, showLoader } from "../actions/actions.js";

export const signup = (formData, navigate, formName) => async (dispatch) => {
  try {
    dispatch(showLoader());
    const { data } = await api.signUp(formData);
    dispatch(email(data));
    dispatch(hideLoader());
    navigate(PUBLIC_ROUTES.confirmemail);
  } catch (error) {
    reduxErrorsValidation(error, dispatch, formName);
    dispatch(hideLoader());
  }
};

export const signin = (formData, navigate, formName) => async (dispatch) => {
  try {
    dispatch(showLoader());
    const { data } = await api.signIn(formData);
    await dispatch(auth(data));
    dispatch(hideLoader());
    navigate(PRIVATE_ROUTES.homepage);
  } catch (error) {
    reduxErrorsValidation(error, dispatch, formName);
    dispatch(hideLoader());
  }
};

export const gmail = (gmailData, navigate, formName) => async (dispatch) => {
  try {
    dispatch(showLoader());
    const { data } = await api.gmail(gmailData);
    dispatch(email(data));
    navigate(PUBLIC_ROUTES.confirmemail);
    dispatch(hideLoader());
  } catch (error) {
    reduxErrorsValidation(error, dispatch, formName);
    dispatch(hideLoader());
  }
};

export const gmailLogin =
  (gmailData, navigate, formName) => async (dispatch) => {
    try {
      dispatch(showLoader());
      const { data } = await api.gmailLogin(gmailData);
      await dispatch(auth(data));
      navigate(PRIVATE_ROUTES.homepage);
      dispatch(hideLoader());
    } catch (error) {
      reduxErrorsValidation(error, dispatch, formName);
      dispatch(hideLoader());
    }
  };
