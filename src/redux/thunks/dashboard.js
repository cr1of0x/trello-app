import * as api from "../../api/index.js";
import { errorsValidation } from "../../errorsValidation.js";
import { hideLoader, showLoader } from "../actions/actions.js";

export const createDashboard =
  (formData, setErrors, onSucess) => async (dispatch) => {
    try {
      dispatch(showLoader());
      await api.dashboardCreate(formData);
      onSucess();
    } catch (error) {
      errorsValidation(error, setErrors);
      dispatch(hideLoader());
    }
  };
