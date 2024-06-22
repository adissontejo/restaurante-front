import { createTheme } from "@mui/material";

export const theme = {
  colors: {
    brown: {
      50: "#F0EBE7",
      100: "#D1C1B4",
      200: "#BAA38F",
      300: "#9B795C",
      400: "#885F3D",
      500: "#6A370C",
      600: "#60320B",
      900: "#2D1705",
    },
    beige: {
      100: "#FBF2EA",
      200: "#F9ECE0",
      300: "#F6E3D1",
      400: "#F4DDC9",
      500: "#F1D5BB",
      600: "#DBC2AA",
      700: "#AB9785",
      900: "#65594F",
    },
    white: {
      500: "#FFFFFF",
    },
    black: {
      50: "#e8e8e8",
      100: "#cccccc",
      200: "#969696",
      300: "#666666",
      400: "#484848",
      500: "#1A1A1A",
      600: "#181818",
    },
    red: {
      400: "#BA5B51",
    },
    green: {
      100: "#B8D2C3",
      500: "#196F3D",
    },
    text: {
      secondary: "rgba(0, 0, 0, 0.6)",
    },
  },
  fonts: {
    primary: "Mulish",
  },
  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
  },
} as const;

export const muiTheme = createTheme({
  typography: {
    fontFamily: "Mulish",
  },
  palette: {
    primary: {
      main: theme.colors.brown[500],
    },
  },
  spacing: 4,
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          background: "white",
          "& .MuiFormHelperText-root.Mui-error": {
            position: "absolute",
            top: "100%",
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          "&, .MuiInputLabel-asterisk": {
            color: theme.colors.text.secondary,
          },
          "&.Mui-focused, &.Mui-focused .MuiInputLabel-asterisk": {
            color: theme.colors.brown[500],
          },
        },
      },
    },
    MuiCircularProgress: {
      styleOverrides: {
        root: {
          "& .MuiCircularProgress-circle": {
            stroke: theme.colors.text.secondary,
          },
        },
      },
    },
  },
});
