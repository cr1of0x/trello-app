import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { RegisterPage } from "./pages/RegisterPage/RegisterPage";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import { Header } from "./pages/Header/Header";

export const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/registration" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route exact path="/" element={<div>Homepage</div>} />
        <Route
          path="/confirmemail"
          element={
            <div>
              We sent verification message on your email. Please confirm
              registration
            </div>
          }
        />
      </Routes>
    </Router>
  );
};
