import "./App.css";
import { useMemo, useState, useEffect } from "react";
import { darkTheme, lightTheme } from "./Theme";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Index from "./components/Index";
import LoginPage from "./components/auth/Login";
// @mui/material
import { ThemeProvider } from "@mui/material";
import { CssBaseline } from "@mui/material";

function ProtectedRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const user = sessionStorage.getItem("user");
    setIsAuthenticated(!!user);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const appTheme = useMemo(
    () => (darkMode ? darkTheme : lightTheme),
    [darkMode]
  );

  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <Index darkMode={darkMode} setDarkMode={setDarkMode} />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
