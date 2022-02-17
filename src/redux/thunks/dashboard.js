import * as api from "../../api/index.js";
import { errorsValidation } from "../../errorsValidation.js";
import { create, hideLoader, showLoader } from "../actions/actions.js";

export const createDashboard =
  (formData, setErrors, onSucess) => async (dispatch) => {
    try {
      dispatch(showLoader());
      const { data } = await api.dashboardCreate(formData);
      await dispatch(create(data));
      onSucess();
    } catch (error) {
      errorsValidation(error, setErrors);
      dispatch(hideLoader());
    }
  };
