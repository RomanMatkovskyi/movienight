import styled from "styled-components";

export const GalleryWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 30px;
`;

export const MovieItemTitle = styled.h3`
  width: 185px;
`;

export const LoadMoreBtn = styled.button`
  display: block;
  margin: 20px auto;
  background-color: transparent;
  border: none;
  color: #fff;
  cursor: pointer;
  transition: color 0.3s ease-in-out;

  &:hover {
    color: #ff5300;
  }
`;
