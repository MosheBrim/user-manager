import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#8D6E63",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#D6D2CF",
      contrastText: "#424242",
    },
    background: {
      default: "#EFEBE9",
      paper: "#FAFAFA",
    },
    text: {
      primary: "#5D4037",
      secondary: "#795548",
    },
    error: {
      main: "#D32F2F",
    },
    grey: {
      500: "#BDBDBD",
    },
  },
  typography: {
    fontFamily: `"Roboto", "Arial", sans-serif`,
    button: {
      textTransform: "none",
      fontWeight: "bold",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          "&::-webkit-scrollbar": {
            width: "8px",
            height: "8px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#8D6E63",
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#6F4C42",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#D6D2CF",
            borderRadius: "4px",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        containedSecondary: {
          backgroundColor: "#E0E0E0",
          color: "#5D4037",
          "&:hover": {
            backgroundColor: "#D6D6D6",
          },
        },
        root: {
          borderRadius: "6px",
          height: "42px",
          fontWeight: "bold",
          fontSize: "1rem",
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          "&:hover": {
            color: "#6F4C42",
            transform: "scale(1.1)",
            transition: "transform 0.2s",
          },
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        option: {
          color: "#5D4037",
          backgroundColor: "#EAE8E3",
          '&[data-focus="true"]': {
            backgroundColor: "#EFEBE9",
          },
          '&[aria-selected="true"]': {
            backgroundColor: "#EAE8E3",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiInputBase-input": {
            "&:-webkit-autofill": {
              WebkitTextFillColor: "#5D4037",
              WebkitBoxShadow: "0 0 0 100px #EAE8E3 inset",
            },
          },
        },
      },
    },
  },
});

export default theme;
