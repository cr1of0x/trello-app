import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { Dashboard } from "./сomponents/Dashboard/Dashboard";
import { Header } from "./сomponents/Header/Header";
import RegisterForm from "./сomponents/RegisterForm/RegisterForm";

export const App = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  return (
    <Router>
      <Header user={user} setUser={setUser} />
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/registration" element={<RegisterForm />} />
        <Route path="/login" element={<LoginPage />} />
        <Route exact path="/" element={<div>Homepage</div>} />
      </Routes>
    </Router>
  );
};
