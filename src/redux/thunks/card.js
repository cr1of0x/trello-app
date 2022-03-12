import * as api from "../../api/index.js";
import { reduxErrorsValidation } from "../../helpers/reduxErrorsValidation.js";
import { getLists } from "./list.js";

export const createCard =
  (id, dashboard_id, formData, onSucess) => async (dispatch) => {
    try {
      await api.cardCreate({ id, formData });
      await dispatch(getLists(dashboard_id));
      onSucess();
    } catch (error) {
      reduxErrorsValidation(error, dispatch, formData);
    }
  };

export const editCard = (id, title) => async (dispatch) => {
  try {
    await api.editCard({ id, title });
  } catch (error) {
    throw error;
  }
};

export const deleteAllCards = (list_id, dashboard_id) => async (dispatch) => {
  try {
    await api.deleteAllCards({ list_id });
    await dispatch(getLists(dashboard_id));
  } catch (error) {
    throw error;
  }
};

export const moveAllCards = (data) => async (dispatch) => {
  try {
    await api.moveAllCards({ data });
  } catch (error) {
    throw error;
  }
};
