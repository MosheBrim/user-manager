import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Paper,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
  const { fields, handleChange, handleSubmit, isLoading, error } = useLogin();

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        minWidth: "100vw",
      }}
    >
      <Paper
        elevation={5}
        sx={{
          padding: 4,
          width: "100%",
          maxWidth: 340,
          textAlign: "center",
          borderRadius: 2,
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          color="text.primary"
        >
          Welcome
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          Please sign in to continue
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 3, mt: 2 }}
        >
          {Object.keys(fields).map((fieldName) => (
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
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={isLoading}
          >
            {isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Login"
            )}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
