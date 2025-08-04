import styled from "styled-components";
import { NavLink } from "react-router";

export const Container = styled.div`
  display: flex;
  gap: 20px;
`;

export const NavLinkStyled = styled(NavLink)`
  padding-top: 10px;
  padding-bottom: 10px;
  font-size: 20px;
  color: #fff;
  text-decoration: none;
  transition: color 0.3s ease-in-out;

  &:hover {
    color: #ff5300;
  }

  &.active {
    color: #ff5300;
  }
`;
