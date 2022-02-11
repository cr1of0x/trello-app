import { Navigate } from "react-router-dom";

export const PublicRoute = ({ Component }) => {
  const token = localStorage.getItem("token");
  return !token ? <Component /> : <Navigate to="/" />;
};
