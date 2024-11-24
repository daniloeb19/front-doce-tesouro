import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Dashboard } from "./pages/Dashboard";
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme";
import { Navbar } from "./components/NavBar";
import useCounterStore from "./zustand";

const App = () => {
  const token = useCounterStore((state) => state.token); // Obtendo o token da store

  // Função para proteger rotas privadas
  const ProtectedRoute = ({ element }: { element: JSX.Element }) => {
    return token ? element : <Navigate to="/" />; // Se não houver token, redireciona para a Home
  };

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route
            path={"/"}
            element={
              <>
                <Navbar />
                <Home />
              </>
            }
          />
          <Route
            path="/cardapio"
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
              <ProtectedRoute
                element={
                  <>
                    <Navbar />
                    <Dashboard />
                  </>
                }
              />
            }
          />
          <Route path="*" element={<h1>404</h1>} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
