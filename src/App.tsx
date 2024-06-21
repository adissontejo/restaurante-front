import { ThemeProvider as MuiThemeProvider } from "@mui/material";
import { muiTheme, theme } from "./styles/theme";
import { Routes } from "./Routes";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { ThemeProvider } from "styled-components";
import { QueryClientProvider } from "@tanstack/react-query";
import { GlobalStyles } from "./styles/global";
import { queryClient } from "./services/queries/client";
import { ToastContainer } from "react-toastify";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./contexts/Auth";

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <MuiThemeProvider theme={muiTheme}>
        <ThemeProvider theme={theme}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <GoogleOAuthProvider
              clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
            >
              <AuthProvider>
                <GlobalStyles />
                <Routes />
                <ToastContainer
                  position="top-right"
                  autoClose={5000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="light"
                />
              </AuthProvider>
            </GoogleOAuthProvider>
          </LocalizationProvider>
        </ThemeProvider>
      </MuiThemeProvider>
    </QueryClientProvider>
  );
};
