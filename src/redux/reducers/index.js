import { combineReducers } from "redux";

import auth from "./auth";
import preloader from "./preloader";
import toast from "./toast";
import dashboards from "./dashboards";
import errors from "./form";
import lists from "./lists";

export default combineReducers({
  auth,
  preloader,
  toast,
  dashboards,
  errors,
  lists,
});
