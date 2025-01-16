import { createRoot } from "react-dom/client";
import AlertSnackbar from "../components/shared/Alert";
import ConfirmAlert from "../components/shared/ConfirmAlert";

const ALERT_ELEMENT_ID = "global-alert";
const CONFIRM_ELEMENT_ID = "global-confirm";

export const showAlert = (
  message: string,
  type: "success" | "error" | "info" | "warning",
  duration?: number
) => {
  const existingDiv = document.getElementById(ALERT_ELEMENT_ID);
  if (existingDiv) existingDiv.remove();

  const div = document.createElement("div");
  div.id = ALERT_ELEMENT_ID;
  document.body.appendChild(div);

  const root = createRoot(div);

  const handleClose = () => {
    root.unmount();
    div.remove();
  };

  root.render(AlertSnackbar({ message, type, duration, onClose: handleClose }));
};

export const showConfirm = (
  title: string,
  message: string,
  onConfirm: () => void,
  onCancel: () => void,
  confirmText?: string,
  cancelText?: string
) => {
  const existingDiv = document.getElementById(CONFIRM_ELEMENT_ID);
  if (existingDiv) existingDiv.remove();

  const div = document.createElement("div");
  div.id = CONFIRM_ELEMENT_ID;
  document.body.appendChild(div);

  const root = createRoot(div);

  const handleClose = () => {
    root.unmount();
    div.remove();
  };

  root.render(
    ConfirmAlert({
      open: true,
      title,
      message,
      onConfirm: () => {
        handleClose();
        onConfirm();
      },
      onCancel: () => {
        handleClose();
        onCancel();
      },
      confirmText,
      cancelText,
    })
  );
};
