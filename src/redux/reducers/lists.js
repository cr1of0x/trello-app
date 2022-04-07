import { SET_LISTS } from "../constants/actionTypes";

const initialState = { lists: [] };

const listsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LISTS:
      return { lists: action.data };
    default:
      return state;
  }
};

export default listsReducer;
