import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { RegisterPage } from "./pages/RegisterPage/RegisterPage";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import { Header } from "./pages/Header/Header";
import HomePage from "./сomponents/HomePage/HomePage";
import { Loader } from "./сomponents/Loader/Loader";
import { PrivateRoute } from "./сomponents/PrivateRoute/PrivateRoute";
import {
  confirmemail,
  dashboard,
  homepage,
  login,
  registration,
} from "./routes";
import { Provider } from "react-redux";
import { store } from "./redux/store";

export const App = () => {
  const token = localStorage.getItem("token");

  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Routes>
          <Route
            exact
            path={dashboard}
            element={
              <PrivateRoute token={token}>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route path={registration} element={<RegisterPage />} />
          <Route path={login} element={<LoginPage />} />
          <Route
            exact
            path={homepage}
            element={
              <PrivateRoute token={token}>
                <HomePage />
              </PrivateRoute>
            }
          />
          <Route
            path={confirmemail}
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
