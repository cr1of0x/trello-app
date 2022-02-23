import { HIDE_LOADER, SHOW_LOADER } from "../constants/actionTypes";

const initialState = {
  loading: false,
};

const preloaderReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_LOADER:
      return { ...state, loading: true };
    case HIDE_LOADER:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default preloaderReducer;
