import { toast } from "react-toastify";

interface ToasterParams {
  message: string;
  type: "success" | "error" | "warning" | "info";
}

const Toaster = ({ message, type }: ToasterParams) => {
  const toastTypes = {
    success: toast.success,
    error: toast.error,
    warning: toast.warn,
    info: toast.info,
  };

  const toastFunction = toastTypes[type] || toast.info;

  return toastFunction(message, {
    position: "bottom-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });
};

export default Toaster;
