import { RouterProvider } from "react-router-dom";
import router from "./routes/routes";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {  ThemeProvider } from "@mui/material/styles";
import { theme } from "./styles/theme/createTheme";
import { AuthProvider } from "./context/AuthContext";


export default function App() {
  
  return <>
    <AuthProvider>
        <ThemeProvider theme={theme}>
          <RouterProvider router={router} />;
          <ToastContainer />
        </ThemeProvider>
    </AuthProvider>
  </>
}