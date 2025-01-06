import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Avatar,
} from "@mui/material";
import { Logout } from "@mui/icons-material";
import { Outlet } from "react-router-dom";
import { useLayout } from "../hooks/useLayout";

const Layout = () => {
  const { username, handleLogout } = useLayout();

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "secondary.main",
          color: "secondary.contrastText",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Avatar sx={{ bgcolor: "primary.main" }}>
              {username ? username.charAt(0).toUpperCase() : "?"}
            </Avatar>
            <Typography variant="h6" component="div" color="text.primary">
              {username}
            </Typography>
          </Box>
          <IconButton color="primary" onClick={handleLogout}>
            <Logout
              sx={{ fontSize: 22, stroke: "currentColor", strokeWidth: 1.5 }}
            />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box sx={{ padding: 3, marginTop: "64px" }}>
        <Outlet />
      </Box>
    </>
  );
};

export default Layout;
