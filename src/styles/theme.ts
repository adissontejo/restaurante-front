import { createTheme } from "@mui/material";

export const theme = {
  colors: {
    brown: {
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
      600: "#181818",
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
});
