import * as api from "../../api/index.js";
import { reduxErrorsValidation } from "../../helpers/reduxErrorsValidation.js";
import { hideLoader, showLoader } from "../actions/actions.js";
import { SET_LISTS } from "../constants/actionTypes.js";
import { onSubmit } from "./dashboard.js";

export const getLists = (id) => async (dispatch) => {
  try {
    dispatch(showLoader());
    const lists = await api.getLists(id);
    const data = lists.data;
    await dispatch({ type: SET_LISTS, data });
    dispatch(hideLoader());
  } catch (error) {
    dispatch(hideLoader());
    throw error;
  }
};

export const createList = (id, formData, onSucess) => async (dispatch) => {
  try {
    dispatch(showLoader());
    await api.createList({ id, formData });
    await dispatch(getLists(id));
    dispatch(onSubmit());
    onSucess();
  } catch (error) {
    reduxErrorsValidation(error, dispatch, formData);
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
