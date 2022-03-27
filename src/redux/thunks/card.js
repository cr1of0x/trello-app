import * as api from "../../api/index.js";
import { reduxErrorsValidation } from "../../helpers/reduxErrorsValidation.js";
import { onSubmit } from "./dashboard.js";
import { getLists } from "./list.js";

export const createCard =
  (id, dashboard_id, formData, onSucess, formName) => async (dispatch) => {
    try {
      await api.cardCreate({ id, formData });
      await dispatch(getLists(dashboard_id));
      dispatch(onSubmit());
      onSucess();
    } catch (error) {
      reduxErrorsValidation(error, dispatch, formName);
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

export const moveAllCards =
  (list_from_id, list_to_id, cards, dashboard_id) => async (dispatch) => {
    try {
      await api.moveAllCards({ list_to_id, list_from_id, cards });
      await dispatch(getLists(dashboard_id));
    } catch (error) {
      throw error;
    }
  };

export const dragAndDropCard =
  (card_id, list_from_id, list_to_id, dashboard_id) => async (dispatch) => {
    try {
      if (list_from_id !== list_to_id) {
        await api.dragDropCard({ card_id, list_from_id, list_to_id });
        await dispatch(getLists(dashboard_id));
      }
    } catch (error) {
      throw error;
    }
  };

export const dragAndDropCardOnCard =
  (dragged_card_id, top_card_id, list_from_id, list_to_id, dashboard_id) =>
  async (dispatch) => {
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
