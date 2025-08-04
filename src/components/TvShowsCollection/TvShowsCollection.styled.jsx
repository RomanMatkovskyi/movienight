import styled from "styled-components";

export const GalleryWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 30px;
`;

export const ShowItemTitle = styled.h3`
  margin-top: 10px;
  width: 185px;
  font-size: 18px;
  color: #fff;
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

export const NoMovieTitle = styled.p`
  margin-top: 20px;
  font-size: 20px;
  color: #fff;
`;
