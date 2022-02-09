import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { RegisterPage } from "./pages/RegisterPage/RegisterPage";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import { Header } from "./pages/Header/Header";
import HomePage from "./сomponents/HomePage/HomePage";
import { Loader } from "./сomponents/Loader/Loader";
import { PrivateRoute } from "./сomponents/PrivateRoute/PrivateRoute";
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from "./routes";
import { Provider } from "react-redux";
import { store } from "./redux/store";

export const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Routes>
          <Route
            path={PRIVATE_ROUTES.dashboard}
            element={<PrivateRoute Component={Dashboard} />}
          />
          <Route path={PUBLIC_ROUTES.registration} element={<RegisterPage />} />
          <Route path={PUBLIC_ROUTES.login} element={<LoginPage />} />
          <Route
            exact
            path={PRIVATE_ROUTES.homepage}
            element={<PrivateRoute Component={HomePage} />}
          />
          <Route
            path={PUBLIC_ROUTES.confirmemail}
            element={
              <div>
                We sent verification message on your email. Please confirm
                registration
              </div>
            }
          />
        </Routes>
        <Loader />
      </Router>
    </Provider>
  );
};
