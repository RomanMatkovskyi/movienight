import styled from "styled-components";
import { NavLink } from "react-router";

export const Container = styled.div`
  display: flex;
  gap: 20px;
`;

export const NavLinkStyled = styled(NavLink)`
  color: #fff;
  text-decoration: none;

  &.active {
    color: #ff5300;
  }
`;
