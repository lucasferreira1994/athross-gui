import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GlobalStyle } from "./styles/GlobalStyle";
import { useState } from "react";
import { createTheme, ThemeProvider as MuiThemeProvider } from "@mui/material";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./styles/theme";
import LoginPage from "./pages/LoginPage";
import DocumentsPage from "./pages/DocumentsPage";

function App() {
  const [theme, setTheme] = useState("light");

  const muiTheme = createTheme({
    palette: {
      mode: theme,
    },
  });

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <MuiThemeProvider theme={muiTheme}>
        <BrowserRouter>
          <GlobalStyle />
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route
              path="/documents"
              element={<DocumentsPage setTheme={setTheme} />}
            />
          </Routes>
        </BrowserRouter>
      </MuiThemeProvider>
    </ThemeProvider>
  );
}

export default App;
