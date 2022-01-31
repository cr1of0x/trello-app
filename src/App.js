import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterForm from "./forms/RegisterForm/RegisterForm";
import { LoginPage } from "./pages/LoginPage";
import { Dashboard } from "./сomponents/Dashboard/Dashboard";
import { Header } from "./сomponents/Header/Header";

export const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/registration" element={<RegisterForm />} />
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
