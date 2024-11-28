import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Dashboard } from "./pages/Dashboard";
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme";
import { Navbar } from "./components/NavBar";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <Home />
              </>
            }
          />
          <Route
            path="/dashboard"
            element={
              <>
                <Navbar />
                <Dashboard />
              </>
            }
          />
          <Route path="*" element={<h1>404 - Página não encontrada</h1>} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
