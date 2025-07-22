import styled from "styled-components";

export const Wrapper = styled.ul`
  margin-bottom: 20px;
  display: flex;
  justify-content: left;
  align-items: baseline;
  gap: 20px;
`;

export const GenreTitle = styled.button`
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

export const ItemWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
