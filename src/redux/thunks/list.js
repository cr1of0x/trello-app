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

export const createList = (data, onSucess) => async (dispatch) => {
  const { id, formData, formName } = data;
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

export const deleteList = (data) => async (dispatch) => {
  const { dashboard_id, list_id } = data;
  try {
    dispatch(showLoader());
    await api.deleteList({ dashboard_id, list_id });
    await dispatch(getLists(dashboard_id));
  } catch (error) {
    dispatch(hideLoader());
    throw error;
  }
};

export const editList = (data) => async (dispatch) => {
  try {
    const { id, title } = data;
    await api.editList({ id, title });
  } catch (error) {
    throw error;
  }
};

export const copyOneList = (data, onSucess) => async (dispatch) => {
  const { formData, cards, dashboard_id, formName } = data;
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

export const moveList = (data) => async (dispatch) => {
  const { draggedList, listToDrop, dashboard_id } = data;
  try {
    await api.moveList({ draggedList, listToDrop, dashboard_id });
    await dispatch(getLists(dashboard_id));
  } catch (error) {
    throw error;
  }
};
