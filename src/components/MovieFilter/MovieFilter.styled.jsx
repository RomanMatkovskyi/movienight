import styled from "styled-components";

export const FilterCatalogBtn = styled.button`
  background-color: transparent;
  border: none;
  color: #fff;
  cursor: pointer;
  font-size: 16px;
`;

export const GenresTitle = styled.p`
  margin-top: 10px;
  margin-bottom: 10px;
  color: #fff;
`;

export const GenresContainer = styled.div`
  display: flex;
  gap: 20px;
`;

export const GenresItemTitle = styled.button`
  color: #fff;
  background-color: transparent;
  border: none;
  cursor: pointer;
  transition: color 0.3s ease-in-out;

  &:hover {
    color: #ff5300;
  }

  &.active {
    color: #ff5300;
  }
`;
