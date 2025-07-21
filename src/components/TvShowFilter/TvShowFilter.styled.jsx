import styled from "styled-components";

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
