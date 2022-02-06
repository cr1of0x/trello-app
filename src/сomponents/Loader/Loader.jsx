import { useSelector } from "react-redux";
import "./Loader.css";

export const Loader = () => {
  const loading = useSelector((state) => state.auth.loading);

  if (!loading) return null;
  return (
    <div className="lds-spinner">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};
