import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { PRIVATE_ROUTES, PUBLIC_ROUTES } from "./routes";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { Header } from "./components/pages/Header/Header";
import { Dashboard } from "./components/pages/Dashboard/Dashboard";
import { RegisterPage } from "./components/pages/RegisterPage/RegisterPage";
import { LoginPage } from "./components/pages/LoginPage/LoginPage";
import HomePage from "./components/pages/HomePage/HomePage";

import { ConfirmEmail } from "./components/pages/ConfirmEmail/ConfirmEmail";
import { PrivateRoute } from "./components/сomponents/PrivateRoute/PrivateRoute";
import { Loader } from "./components/сomponents/Loader/Loader";
import { PublicRoute } from "./components/сomponents/PublicRoute/PublicRoute";

export const App = () => {
  console.log(localStorage.getItem("token"));
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Routes>
          <Route
            path={PRIVATE_ROUTES.dashboard}
            element={<PrivateRoute Component={Dashboard} />}
          />
          <Route
            path={PUBLIC_ROUTES.registration}
            element={<PublicRoute Component={RegisterPage} />}
          />
          <Route
            path={PUBLIC_ROUTES.login}
            element={<PublicRoute Component={LoginPage} />}
          />
          <Route
            exact
            path={PRIVATE_ROUTES.homepage}
            element={<PrivateRoute Component={HomePage} />}
          />
          <Route
            path={PUBLIC_ROUTES.confirmemail}
            element={<PublicRoute Component={ConfirmEmail} />}
          />
        </Routes>
        <Loader />
      </Router>
    </Provider>
  );
};
