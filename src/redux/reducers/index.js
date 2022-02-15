import { combineReducers } from "redux";

import auth from "./auth";
import dashboard from "./dashboard";
import preloader from "./preloader";

export default combineReducers({
  auth,
  dashboard,
  preloader,
});
