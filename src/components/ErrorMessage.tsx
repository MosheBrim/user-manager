import { Box, Typography } from "@mui/material";

const ErrorMessage: React.FC<{ message: string }> = ({ message }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80vh",
      }}
    >
      <Typography color="error" variant="h6">
        {message}
      </Typography>
    </Box>
  );
};

export default ErrorMessage;