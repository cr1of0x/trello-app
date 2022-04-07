import { DRAG_CARD, DRAG_LIST } from "../constants/actionTypes";

const initialState = { card: "", list: "", isList: false };

const dragDropReducer = (state = initialState, action) => {
  switch (action.type) {
    case DRAG_CARD:
      return { ...state, card: action.data.card, list: action.data.list };
    case DRAG_LIST:
      return { isList: action.data.isList, list: action.data.list };
    default:
      return state;
  }
};

export default dragDropReducer;
