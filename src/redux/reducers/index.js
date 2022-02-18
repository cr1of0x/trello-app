import { combineReducers } from "redux";

import auth from "./auth";

import preloader from "./preloader";

export default combineReducers({
  auth,
  preloader,
});
