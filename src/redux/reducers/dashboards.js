import { SET_DASHBOARDS } from "../constants/actionTypes";

const initialState = { dashboards: [] };

const dashboardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DASHBOARDS:
      return { dashboards: action.data };
    default:
      return state;
  }
};

export default dashboardsReducer;
