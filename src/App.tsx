import { ThemeProvider as MuiThemeProvider } from "@mui/material";
import { muiTheme, theme } from "./styles/theme";
import { Routes } from "./Routes";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./styles/global";

export const App = () => {
  return (
    <MuiThemeProvider theme={muiTheme}>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <GlobalStyles />
          <Routes />
        </LocalizationProvider>
      </ThemeProvider>
    </MuiThemeProvider>
  );
};
