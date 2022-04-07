import * as api from "../../api/index.js";
import { reduxErrorsValidation } from "../../helpers/reduxErrorsValidation.js";
import { onSubmit } from "./dashboard.js";
import { getLists } from "./list.js";

export const createCard = (data, onSucess) => async (dispatch) => {
  const { list_id, dashboard_id, formData, formName } = data;
  try {
    await api.cardCreate({ list_id, formData });
    await dispatch(getLists(dashboard_id));
    dispatch(onSubmit());
    onSucess();
  } catch (error) {
    reduxErrorsValidation(error, dispatch, formName);
  }
};

export const editCard = (data) => async (dispatch) => {
  const { id, title } = data;
  try {
    await api.editCard({ id, title });
  } catch (error) {
    throw error;
  }
};

export const deleteAllCards = (data) => async (dispatch) => {
  const { list_id, dashboard_id } = data;
  try {
    await api.deleteAllCards({ list_id });
    await dispatch(getLists(dashboard_id));
  } catch (error) {
    throw error;
  }
};

export const moveAllCards = (data) => async (dispatch) => {
  const { list_from_id, list_to_id, cards, dashboard_id } = data;
  try {
    await api.moveAllCards({ list_to_id, list_from_id, cards });
    await dispatch(getLists(dashboard_id));
  } catch (error) {
    throw error;
  }
};

export const dragAndDropCard = (data) => async (dispatch) => {
  const { card_id, list_from_id, list_to_id, dashboard_id } = data;
  try {
    if (list_from_id !== list_to_id) {
      await api.dragDropCard({ card_id, list_from_id, list_to_id });
      await dispatch(getLists(dashboard_id));
    }
  } catch (error) {
    throw error;
  }
};

export const dragAndDropCardOnCard = (data) => async (dispatch) => {
  const {
    dragged_card_id,
    top_card_id,
    list_from_id,
    list_to_id,
    dashboard_id,
  } = data;
  try {
    if (list_from_id === list_to_id) {
      await api.dragDropCardSameList({
        dragged_card_id,
        top_card_id,
        list_to_id,
      });
    } else {
      await api.dragDropCardAnotherList({
        dragged_card_id,
        top_card_id,
        list_from_id,
        list_to_id,
      });
    }
    await dispatch(getLists(dashboard_id));
  } catch (error) {
    throw error;
  }
};

export const editDescriptionCard = (data) => async (dispatch) => {
  const { id, descript, dashboard_id } = data;
  try {
    await api.editCardDescription({ id, descript });
    await dispatch(getLists(dashboard_id));
  } catch (error) {
    throw error;
  }
};
