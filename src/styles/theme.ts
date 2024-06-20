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
    white: {
      500: "#FFFFFF",
    },
    black: {
      50: "#e8e8e8",
      400: "#484848",
      500: "#1A1A1A",
      600: "#181818",
    },
    text: {
      secondary: "rgba(0, 0, 0, 0.6)",
    },
    beige: {
      100: "#FBF2EA",
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
    MuiPopover: {
      styleOverrides: {
        root: {
          "& .MuiPaper-root": {
            background: "transparent",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: "none",
        },
      },
    },
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
