import React from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  CircularProgress,
  Modal,
  Alert,
} from "@mui/material";
import { useUserForm } from "../hooks/useUserForm";
import { IUser } from "../interfaces/userInterface";

interface IUserFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: IUser) => void;
  error: string | null;
  user?: IUser;
  isEditMode?: boolean;
  isLoading?: boolean;
}

const UserFormPopup: React.FC<IUserFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  user,
  error,
  isEditMode = false,
  isLoading = false,
}) => {
  const { fields, handleChange, handleSubmit } = useUserForm({
    user,
    onSubmit,
  });

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="user-form-title"
      aria-describedby="user-form-description"
    >
      <Paper
        elevation={3}
        sx={{
          width: "90%",
          maxWidth: 380,
          padding: 4,
          borderRadius: 2,
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: (theme) => theme.zIndex.modal + 1,
          boxSizing: "border-box",
        }}
      >
        <Typography
          variant="h5"
          component="h2"
          gutterBottom
          textAlign={"center"}
        >
          {isEditMode ? "Edit User" : "Add User"}
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            mt: 2,
          }}
        >
          {Object.keys(fields)
            .filter((fieldName) => !(isEditMode && fieldName === "password"))
            .map((fieldName) => (
              <TextField
                key={fieldName}
                label={fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}
                name={fieldName}
                variant="outlined"
                fullWidth
                value={fields[fieldName].value}
                onChange={handleChange}
                error={!!fields[fieldName].error}
                helperText={fields[fieldName].helperText}
                type={fieldName === "password" ? "password" : "text"}
                autoComplete={fieldName}
              />
            ))}

          {error && <Alert severity="error">{error}</Alert>}

          <Box
            sx={{
              marginTop: "18px",
              display: "flex",
              justifyContent: "space-between",
              gap: 2,
            }}
          >
            <Button
              type="button"
              variant="contained"
              color="secondary"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isLoading}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {isLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : isEditMode ? (
                "Save Changes"
              ) : (
                "Add User"
              )}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Modal>
  );
};

export default UserFormPopup;
