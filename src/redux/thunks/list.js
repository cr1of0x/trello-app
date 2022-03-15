import * as api from "../../api/index.js";
import { reduxErrorsValidation } from "../../helpers/reduxErrorsValidation.js";
import { hideLoader, setLists, showLoader } from "../actions/actions.js";
import { onSubmit } from "./dashboard.js";

export const getLists = (id) => async (dispatch) => {
  try {
    dispatch(showLoader());
    const lists = await api.getLists(id);
    const data = lists.data;
    await dispatch(setLists(data));
    dispatch(hideLoader());
  } catch (error) {
    dispatch(hideLoader());
    throw error;
  }
};

export const createList =
  (id, formData, onSucess, formName) => async (dispatch) => {
    try {
      dispatch(showLoader());
      await api.createList({ id, formData });
      await dispatch(getLists(id));
      dispatch(onSubmit());
      onSucess();
    } catch (error) {
      reduxErrorsValidation(error, dispatch, formName);
      dispatch(hideLoader());
    }
  };

export const deleteList = (dashboard_id, list_id) => async (dispatch) => {
  try {
    dispatch(showLoader());
    await api.deleteList({ dashboard_id, list_id });
    await dispatch(getLists(dashboard_id));
  } catch (error) {
    dispatch(hideLoader());
    throw error;
  }
};

export const editList = (id, title) => async (dispatch) => {
  try {
    await api.editList({ id, title });
  } catch (error) {
    throw error;
  }
};

export const copyOneList =
  (formData, cards, dashboard_id, onSucess, formName) => async (dispatch) => {
    try {
      dispatch(showLoader());
      await api.copyList({ formData, cards, dashboard_id });
      await dispatch(getLists(dashboard_id));
      dispatch(onSubmit());
      onSucess();
    } catch (error) {
      reduxErrorsValidation(error, dispatch, formName);
      dispatch(hideLoader());
    }
  };
