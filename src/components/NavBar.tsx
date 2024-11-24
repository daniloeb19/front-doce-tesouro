import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { Dropdown, Image, Navbar as NavBarBS } from "react-bootstrap";
import styled from "styled-components";
import doceTesouro from "../assets/circular-doce.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { LoginModal } from "./Modal";
import useCounterStore from "../zustand";
import { axiosInstance } from "../config/axios";
import menu from "../assets/menu.svg";
export const Navbar = () => {
  const [isLoginModalVisible, setLoginModalVisible] = useState(false);
  const { setToken, token } = useCounterStore();
  const navigate = useNavigate();

  const handleLoginSubmit = async (credentials: {
    email: string;
    password: string;
  }) => {
    try {
      const response = await axiosInstance.post("/auth/login", credentials);
      if (response.status === 200) {
        setToken(response.data.token);
        navigate("/dashboard");
        setLoginModalVisible(false);
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    }
  };

  const handleLogout = () => {
    setToken(""); // Limpa o token
    navigate("/"); // Redireciona para a página inicial
  };

  return (
    <>
      <NavBarBSSyled>
        <Container>
          <NavBarBS.Brand href="/">
            <ImageStyled src={doceTesouro} />
            <TextStyled>Doce Tesouro</TextStyled>
          </NavBarBS.Brand>

          <Nav className="me-auto">
            <LinkStyled as={Link} to="/">
              Cardápio
            </LinkStyled>
            <LinkStyled as={Link} to="/sobre">
              Quem somos
            </LinkStyled>
            <LinkStyled as={Link} to="/contato">
              Contato
            </LinkStyled>
          </Nav>
        </Container>

        <Dropdown align="end">
          <Dropdown.Toggle variant="link" id="dropdown-custom-components">
            <TextStyleRestrict>
              <ImageStyled src={menu} />
            </TextStyleRestrict>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {token ? (
              <>
                <Dropdown.Item onClick={() => navigate("/dashboard")}>
                  Dashboard
                </Dropdown.Item>
                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
              </>
            ) : (
              <Dropdown.Item onClick={() => setLoginModalVisible(true)}>
                Login
              </Dropdown.Item>
            )}
          </Dropdown.Menu>
        </Dropdown>
      </NavBarBSSyled>

      <LoginModal
        show={isLoginModalVisible}
        onClose={() => setLoginModalVisible(false)}
        onSubmit={handleLoginSubmit}
      />
    </>
  );
};

const TextStyleRestrict = styled.span`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1rem;
  margin: 0;
  padding: 0;
`;

const TextStyled = styled.span`
  font-family: "Cienfuegos", system-ui, -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
    sans-serif;
  font-size: 2rem;
`;

const ImageStyled = styled(Image)`
  width: 40px;
  height: 40px;
`;

const NavBarBSSyled = styled(NavBarBS)`
  background-color: ${({ theme }) => theme && theme.colors.beigeLight};
  margin-bottom: 20px;
`;

const LinkStyled = styled(Nav.Link)`
  font-weight: 400;
  font-size: 1.7rem;
  margin: 0 8px;
  text-decoration: none;
  font-family: "Cienfuegos", system-ui, -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
    sans-serif;
  color: ${({ theme }) => theme && theme.colors.darkBrown};
  &:hover {
    color: ${({ theme }) => theme && theme.colors.oliveLight};
  }
`;
