import { combineReducers } from "redux";

import auth from "./auth";

import preloader from "./preloader";
import toast from "./toast";

export default combineReducers({
  auth,
  preloader,
  toast,
});
