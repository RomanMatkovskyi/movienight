import { Container, NavLinkStyled } from "./NavBar.styled";

const NavBar = () => {
  return (
    <Container>
      <NavLinkStyled to={"/"}>Home</NavLinkStyled>
      <NavLinkStyled to={"/movies"}>Movies</NavLinkStyled>
      <NavLinkStyled to={"/tv"}>TV Shows</NavLinkStyled>
    </Container>
  );
};

export default NavBar;
