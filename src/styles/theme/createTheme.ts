import { createTheme } from "@mui/material";

export const theme = createTheme({
  colorSchemes: { light: true, dark: false },
  palette: {
    primary: {
      main: "#228BE6",  
    },
    secondary: {
      main: "#E67E22",  
    },
    background: {
      default: "#F5F5F5", 
      paper: "#FFFFFF",  
    },
    text: {
      primary: "#6C757D",  
      secondary: "#7F8C8D", 
    },
    error: {
      main: "#E74C3C", 
    },
    success: {
      main: "#27AE60", 
    },
    warning: {
      main: "#F39C12",  
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",  
    h1: {
      fontWeight: 700,  
    },
    button: {
      textTransform: "none", 
    },
  },
});
