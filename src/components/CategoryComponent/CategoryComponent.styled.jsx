import styled from "styled-components";
import { NavLink, Link } from "react-router";

export const SectionWrapper = styled.div`
  padding-bottom: 100px;
`;

export const Wrapper = styled.ul`
  margin-bottom: 20px;
  display: flex;
  justify-content: left;
  align-items: baseline;
  gap: 20px;
`;

export const CategoryTitle = styled.h2`
  padding-bottom: 15px;
  font-size: 30px;
  color: #fff;
`;

export const GenreTitle = styled.button`
  padding-top: 10px;
  padding-bottom: 10px;
  font-size: 15px;
  color: #fff;
  background-color: transparent;
  border: none;
  cursor: pointer;
  transition: color 0.3s ease-in-out;

  &:hover {
    color: #ff5300;
  }

  &.choosen_genre {
    color: #ff5300;
  }
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: #fff;
  transition: color 0.3s ease-in-out;

  &:hover {
    color: #ff5300;
  }
`;
export const ItemWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const MovieTitle = styled.h3`
  width: 154px;
  margin-top: 8px;
  font-size: 16px;
`;

export const GetMoreLink = styled(Link)`
  display: block;
  width: 126px;
  margin-left: auto;
  margin-right: 10px;
  text-decoration: none;
  color: #fff;
  transition: color 0.3s ease-in-out;

  &:hover {
    color: #ff5300;
  }
`;
