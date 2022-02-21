import { useEffect } from "react";
import { useSelector } from "react-redux";
import { notify } from "../helpers/notify";

export const withNotification = (Component) => {
  const NewComponent = (props) => {
    const toast = useSelector((state) => state.toast.notifyMessage);

    useEffect(() => {
      if (toast !== "") {
        notify(toast);
      }
    }, [toast]);
    return <Component {...props} />;
  };

  return NewComponent;
};
