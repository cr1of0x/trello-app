import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { PRIVATE_ROUTES, PUBLIC_ROUTES } from "./routes";
import { Header } from "./components/pages/Header/Header";
import { RegisterPage } from "./components/pages/RegisterPage/RegisterPage";
import { LoginPage } from "./components/pages/LoginPage/LoginPage";
import { HomePage } from "./components/pages/HomePage/HomePage";

import { ConfirmEmail } from "./components/pages/ConfirmEmail/ConfirmEmail";
import { PrivateRoute } from "./components/сomponents/PrivateRoute/PrivateRoute";
import { Loader } from "./components/сomponents/Loader/Loader";
import { PublicRoute } from "./components/сomponents/PublicRoute/PublicRoute";
import { withProvider } from "./hocs/withProvider";
import { withNotification } from "./hocs/withNotification";
import { DashboardDetails } from "./components/pages/DashboardDetails/DashboardDetails";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
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
        <Route
          exact
          path={PRIVATE_ROUTES.dashboardDetails}
          element={<DashboardDetails />}
        />
      </Routes>

      <Loader />
    </Router>
  );
};

export default withProvider(withNotification(App));
