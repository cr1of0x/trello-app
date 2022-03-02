import * as api from "../../api/index.js";
import { hideLoader, showLoader } from "../actions/actions.js";
import { SET_LISTS } from "../constants/actionTypes.js";

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

export const createList = (id, title) => async (dispatch) => {
  try {
    dispatch(showLoader());
    await api.createList({ id, title });
    await dispatch(getLists(id));
  } catch (error) {
    dispatch(hideLoader());
    throw error;
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
