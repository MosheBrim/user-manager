import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const ErrorElement: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        height: "100vh",
        backgroundColor: "background.default",
        color: "text.primary",
        padding: 3,
      }}
    >
      <ErrorOutlineIcon sx={{ fontSize: 64, marginBottom: 2, color: "error.main" }} />
      <Typography variant="h4" sx={{ marginBottom: 1 }}>
        Oops! Something went wrong.
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: 3 }}>
        We're sorry, but the page you are looking for does not exist or an error has occurred.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/"
        sx={{ textTransform: "none" }}
      >
        Back to Home
      </Button>
    </Box>
  );
};

export default ErrorElement;
