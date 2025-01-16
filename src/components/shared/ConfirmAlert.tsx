import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

interface ConfirmAlertProps {
  open: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
}

const ConfirmAlert: React.FC<ConfirmAlertProps> = ({
  open,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = "Confirm",
  cancelText = "Cancel",
}) => (
  <Dialog open={open} onClose={onCancel}>
    <DialogTitle
      sx={{
        color: "#5D4037",
      }}
    >
      {title}
    </DialogTitle>
    <DialogContent
      sx={{
        fontFamily: '"Roboto", "Arial", sans-serif',
        fontSize: "1rem",
        color: "#795548",
      }}
    >
      {message}
    </DialogContent>
    <DialogActions>
      <Button
        onClick={onCancel}
        variant="contained"
        sx={{
          backgroundColor: "#D6D2CF !important",
          color: "#424242",
          "&:hover": {
            backgroundColor: "#BEBBBB !important",
          },
        }}
      >
        {cancelText}
      </Button>
      <Button
        onClick={onConfirm}
        variant="contained"
        sx={{
          backgroundColor: "#8D6E63 !important",
          color: "#FFFFFF",
          "&:hover": {
            backgroundColor: "#6F4C42 !important",
          },
        }}
      >
        {confirmText}
      </Button>
    </DialogActions>
  </Dialog>
);

export default ConfirmAlert;
