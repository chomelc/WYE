import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Meals from "./routes/meals";
import Profile from "./routes/profile";
import Root from "./routes/root";
import Settings from "./routes/settings";
import History from "./routes/history";

const MYETheme = createTheme({
  palette: {
    primary: {
      main: '#312F2F'
    },
    secondary: {
      main: '#A8A39D'
    },
    background: {
      paper: "#FFFFFF",
      default: "#F8F1E9"
    },
    text:{
      primary: "#312F2F",
      secondary: '#A8A39D'
      
    }
  },
});


function App() {
  return (
    <ThemeProvider theme={MYETheme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/meals" element={<Meals />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
