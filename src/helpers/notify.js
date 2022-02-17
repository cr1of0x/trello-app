import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const notify = (message) =>
  toast.success(message, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
