import * as api from "../../api/index.js";
import { errorsValidation } from "../../errorsValidation.js";
import { PRIVATE_ROUTES } from "../../routes.js";
import { create, hideLoader, showLoader } from "../actions/actions.js";

export const createDashboard =
  (formData, setModalActive, setErrors, gettingDashboards, notify) =>
  async (dispatch) => {
    try {
      dispatch(showLoader());
      const { data } = await api.dashboardCreate(formData);
      await dispatch(create(data));
      setModalActive(false);
      gettingDashboards();
      dispatch(hideLoader());
      notify();
    } catch (error) {
      errorsValidation(error, setErrors);
      dispatch(hideLoader());
    }
  };
