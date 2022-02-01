import * as api from "../../api/index.js";
import { AUTH, EMAIL } from "../constants/actionTypes.js";

export const signup = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);

    dispatch({ type: EMAIL, data });

    navigate("/confirmemail");
  } catch (error) {
    console.log(error);
  }
};

export const signin = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);

    dispatch({ type: AUTH, data });

    navigate("/dashboard");
  } catch (error) {
    console.log(error);
  }
};
