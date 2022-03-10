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
