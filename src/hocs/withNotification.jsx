import { useEffect } from "react";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { notify } from "../helpers/notify";

export const withNotification = (Component) => {
  const NewComponent = (props) => {
    const toast = useSelector((state) => state.toast.notifyMessage);

    useEffect(() => {
      if (toast !== "") {
        notify(toast);
      }
    }, [toast]);
    return (
      <>
        <Component {...props} />
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </>
    );
  };

  return NewComponent;
};
