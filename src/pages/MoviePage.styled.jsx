import styled from "styled-components";
import { Link } from "react-router";
export const SectionWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 40px;
  margin-top: 20px;
  padding: 30px 0;
  width: 100%;
  background-image: linear-gradient(
      to right,
      #726f65ba calc((50vw - 170px) - 340px),
      #726f65ba 50%,
      #726f65ba 100%
    ),
    url(${(props) => props.$bg || "/images/fallback.jpg"});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

export const MovieImage = styled.img`
  display: block;
  margin-left: 30px;
  border-radius: 8px;
`;

export const MovieTitle = styled.h2`
  width: 800px;
  margin-top: 40px;
  margin-bottom: 5px;
  color: #fff;
  font-size: 50px;
`;

export const GenreWrapper = styled.div`
  margin-bottom: 24px;
  display: flex;
  gap: 10px;
  justify-content: flex-start;
  align-items: baseline;

  Link {
    color: rgba(255, 255, 255, 0.7);
    text-decoration: none;
  }
`;

export const GenreLink = styled(Link)`
  color: rgba(255, 255, 255, 0.7);
`;

export const MovieDescription = styled.p`
  width: 800px;
  margin-bottom: 10px;
  color: #fff;
`;

export const MovieTagLine = styled.p`
  color: #fff;
`;
