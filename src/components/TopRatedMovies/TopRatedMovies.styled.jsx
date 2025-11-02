import styled from "styled-components";
import { Link } from "react-router";

export const Wrapper = styled.div`
  margin-bottom: 38px;
`;

export const CategoryTitle = styled.h2`
  padding-bottom: 15px;
  font-size: 30px;
  color: #fff;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: #fff;
  transition: color 0.3s ease-in-out;

  &:hover {
    color: #ff5300;
  }
`;

export const MovieImg = styled.img`
  width: 1372px;
  position: relative;
`;

export const MovieTitle = styled.h3`
  font-size: 40px;
  position: absolute;
  left: 20px;
  bottom: 20px;
`;
