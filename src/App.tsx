import { GlobalStyles, ThemeProvider } from "@mui/material";
import { theme } from "./styles/theme";
import { Routes } from "./Routes";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <GlobalStyles
          styles={{ "*": { padding: 0, margin: 0, boxSizing: "border-box " } }}
        />
        <Routes />
      </LocalizationProvider>
    </ThemeProvider>
  );
};
