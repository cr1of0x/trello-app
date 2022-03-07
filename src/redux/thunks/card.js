import * as api from "../../api/index.js";

export const createCard = (id, formData) => async (dispatch) => {
  try {
    await api.cardCreate({ id, formData });
  } catch (error) {
    throw error;
  }
};
