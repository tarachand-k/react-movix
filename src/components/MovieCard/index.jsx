import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import { QUERIES } from "../../constants";
import LazyImage from "../lazy-image";
import Genres from "../genres";
import CircleRating from "../circle-rating";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ item, mediaType, isOnlyCard = true }) => {
  const navigate = useNavigate();
  const { imgUrls } = useSelector((state) => state.home);
  const posterUrl = item?.poster_path
    ? imgUrls.poster + item?.poster_path
    : "/no-poster.png";

  return (
    <CarouselItemWrapper
      onClick={() => navigate(`/${item?.media_type || mediaType}/${item.id}`)}
      isOnlyCard={isOnlyCard}
    >
      <PosterBlock isOnlyCard={isOnlyCard}>
        <LazyImage src={posterUrl} />
        {!isOnlyCard && (
          <>
            <CircleRatingModified rating={item.vote_average.toFixed(1)} />
            <ModifiedGenres genreIds={item.genre_ids.slice(0, 2)} />{" "}
          </>
        )}
      </PosterBlock>
      <TextBlock>
        <Title>{item?.title || item?.name}</Title>
        <Date>{dayjs(item?.release_date).format("MMM D, YYYY")}</Date>
      </TextBlock>
    </CarouselItemWrapper>
  );
};

const CarouselItemWrapper = styled.div`
  width: 125px;
  margin-bottom: ${(props) => (props.isOnlyCard ? "30px" : "0")};
  cursor: pointer;
  /* flex-shrink: 0; */
  flex-grow: 1;
  /* flex-basis: 48%; */
  /* ${QUERIES.mobileAndLarge} {
    flex-basis: content;
  } */

  @media ${QUERIES.tabletAndLarge} {
    width: calc(25% - 15px);
  }

  @media ${QUERIES.laptopAndLarge} {
    width: calc(20% - 16px);
  }
  flex-shrink: 0;
`;

const PosterBlock = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1.5;
  background-size: cover;
  background-position: center;
  margin-bottom: ${(props) => (props.isOnlyCard ? "20px" : "30px")};
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding: 10px;

  .lazy-load-image-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    border-radius: 12px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }
  }
`;

const ModifiedGenres = styled(Genres)`
  display: none;
  position: relative;

  @media ${QUERIES.tabletAndLarge} {
    display: flex;
    flex-flow: wrap;
    justify-content: flex-end;
  }
`;

const CircleRatingModified = styled(CircleRating)`
  width: 40px;
  height: 40px;
  top: 30px;
  position: relative;
  background-color: white;
  flex-shrink: 0;

  @media ${QUERIES.tabletAndLarge} {
    width: 50px;
    height: 50px;
  }
`;

const TextBlock = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
`;

const Title = styled.span`
  font-size: 16px;
  margin-bottom: 10px;
  line-height: 24px;

  display: -webkit-box;
  font-weight: normal;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;

  @media ${QUERIES.tabletAndLarge} {
    font-size: ${20 / 16}rem;
  }
`;

const Date = styled.span`
  font-size: ${14 / 16}rem;
  opacity: 0.5;
`;

export default MovieCard;
