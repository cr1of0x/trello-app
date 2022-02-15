import { useSelector } from "react-redux";
import "./Loader.css";

export const Loader = () => {
  const loading = useSelector((state) => state.preloader.loading);

  if (!loading) return null;
  return (
    <div className="wrapper">
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
    </div>
  );
};
