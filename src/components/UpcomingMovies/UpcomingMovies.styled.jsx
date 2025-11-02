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

export const ItemWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: #fff;
  transition: color 0.3s ease-in-out;

  &:hover {
    color: #ff5300;
  }
`;

export const MovieTitle = styled.h3`
  width: 154px;
  margin-top: 8px;
  font-size: 16px;
`;
