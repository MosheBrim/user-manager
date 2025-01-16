import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

interface AlertSnackbarProps {
  message: string;
  type: "success" | "error" | "info" | "warning";
  duration?: number;
  onClose?: () => void;
}

const AlertSnackbar: React.FC<AlertSnackbarProps> = ({
  message,
  type,
  duration = 3000,
  onClose,
}) => (
  <Snackbar
    open
    autoHideDuration={duration}
    onClose={onClose}
    anchorOrigin={{ vertical: "top", horizontal: "center" }}
  >
    <Alert severity={type} onClose={onClose} sx={{ width: "100%" }}>
      {message}
    </Alert>
  </Snackbar>
);

export default AlertSnackbar;
