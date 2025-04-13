import { RouterProvider } from "react-router-dom";
import router from "./routes/routes";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {  ThemeProvider } from "@mui/material/styles";
import { theme } from "./styles/theme/createTheme";
import { AuthProvider } from "./context/AuthContext";
import { NotificationsProvider } from '@toolpad/core/useNotifications';


export default function App() {
  
  return <>
  
  <NotificationsProvider>
    <AuthProvider>
        <ThemeProvider theme={theme}>
          <RouterProvider router={router} />;
          <ToastContainer />
        </ThemeProvider>
    </AuthProvider>
  </NotificationsProvider>
  </>
}