import * as api from "../../api/index.js";

export const createDashboard = (formData) => async (dispatch) => {
  try {
    const { data } = await api.dashboardCreate(formData);
    dispatch({ type: "CREATE", data });
  } catch (error) {
    console.log(error);
  }
};
