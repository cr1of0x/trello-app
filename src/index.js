import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import { withNotification } from "./hocs/withNotification";
import { withProvider } from "./hocs/withProvider";

const Application = withProvider(withNotification(App));

ReactDOM.render(<Application />, document.getElementById("root"));
