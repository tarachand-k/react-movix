import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import useFetch from "../../hooks/useFetch";

import ContentWrapper from "../../components/content-wrapper";
import Genres from "../../components/genres";
import CircleRating from "../../components/circle-rating";
import LazyImage from "../../components/lazy-image";
import { QUERIES } from "../../constants";
import { PlayIcon } from "./PlayIcon";
import VideoPopup from "../../components/video-popup";

const DetailsBanner = ({ trailer, crew }) => {
  const { mediaType, id } = useParams();
  const [data, loading, error] = useFetch(`/${mediaType}/${id}`);
  const [showTrailer, setShowTrailer] = React.useState(false);
  const { imgUrls } = useSelector((state) => state.home);

  const posterPath = data?.poster_path
    ? imgUrls.poster + data.poster_path
    : "/no-poster.png";

  const genreIds = data?.genres.map((genre) => genre.id);

  const directors = crew?.filter((item) => item.job === "Director");

  const writers = crew?.filter((item) =>
    ["Screenplay", "Writer", "Story"].includes(item.job)
  );

  const formatTime = (totalMinutes) => {
    // if (!totalMinutes) return;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
  };

  return (
    <Wrapper>
      {loading && (
        <SkeletonWrapper>
          <SkeletonContentWrapper>
            <SkeletonLeft className="skeleton"></SkeletonLeft>
            <SkeletonRight>
              <Row className="skeleton" />
              <Row className="skeleton" />
              <Row className="skeleton" />
              <Row className="skeleton" />
              <Row className="skeleton" />
              <Row className="skeleton" />
              <Row className="skeleton" />
            </SkeletonRight>
          </SkeletonContentWrapper>
        </SkeletonWrapper>
      )}
      {!loading && data && (
        <>
          <BackdropImg>
            <LazyImage
              className="posterImg"
              src={imgUrls.backdrop + data.backdrop_path}
            />
          </BackdropImg>
          <OpacityLayer />
          <ContentWrapper>
            <Content>
              <ContentLeft>
                <LazyImage className="posterImg" src={posterPath} />
              </ContentLeft>
              <ContentRight>
                <Title>{`${data.name || data.title} (${dayjs(
                  data.release_date
                ).format("YYYY")})`}</Title>
                <SubTitle>{data.tagline}</SubTitle>
                <GenresModified genreIds={genreIds} />

                <Row>
                  <CircleRatingModified rating={data.vote_average.toFixed(1)} />
                  <PlayBtn onClick={() => setShowTrailer(true)}>
                    <PlayIcon />
                    <Text>Watch Trailer</Text>
                  </PlayBtn>
                </Row>
                <Overview>
                  <Heading>Overview</Heading>
                  <Description>{data.overview}</Description>
                </Overview>
                <Info>
                  {data.status && (
                    <InfoItem>
                      <Text className="bold">Status:</Text>
                      <Text>{data.status}</Text>
                    </InfoItem>
                  )}
                  {data.release_date && (
                    <InfoItem>
                      <Text className="bold">Release Date:</Text>
                      <Text>
                        {dayjs(data.release_date).format("MMM D, YYYY")}
                      </Text>
                    </InfoItem>
                  )}
                  {!!data?.runtime && (
                    <InfoItem>
                      <Text className="bold">Runtime:</Text>
                      <Text>{formatTime(data.runtime)}</Text>
                    </InfoItem>
                  )}
                </Info>

                {directors?.length > 0 && (
                  <Info>
                    <Text className="bold">
                      Director{directors.length > 1 ? "s" : ""}:
                    </Text>
                    <Text>
                      {directors.map((d, idx) => (
                        <React.Fragment key={id}>
                          {d.name}
                          {directors.length - 1 !== idx && ", "}
                        </React.Fragment>
                      ))}
                    </Text>
                  </Info>
                )}
                {writers?.length > 0 && (
                  <Info>
                    <Text className="bold">
                      Writer{writers.length > 1 ? "s" : ""}:
                    </Text>
                    <Text>
                      {writers.map((d, idx) => (
                        <React.Fragment key={idx}>
                          {d.name}
                          {writers.length - 1 !== idx && ", "}
                        </React.Fragment>
                      ))}
                    </Text>
                  </Info>
                )}
                {data?.created_by?.length > 0 && (
                  <Info>
                    <Text className="bold">
                      Creator{data.created_by.length > 1 ? "s" : ""}:
                    </Text>
                    <Text>
                      {data.created_by.map((d, idx) => (
                        <React.Fragment key={idx}>
                          {d.name}
                          {data.created_by.length - 1 !== idx && ", "}
                        </React.Fragment>
                      ))}
                    </Text>
                  </Info>
                )}
              </ContentRight>
            </Content>
          </ContentWrapper>
          {showTrailer && (
            <VideoPopup
              show={showTrailer}
              setShow={setShowTrailer}
              videoId={trailer?.key}
            />
          )}
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  width: 100%;
  background-color: var(--black);
  padding-top: 100px;
  position: relative;
  margin-bottom: 50px;

  @media ${QUERIES.tabletAndLarge} {
    margin-bottom: 0;
    padding-top: 120px;
    min-height: 700px;
  }
`;

const BackdropImg = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0.1;
  overflow: hidden;

  .lazy-load-image-background {
    width: 100%;
    height: 100%;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }
  }
`;

const OpacityLayer = styled.div`
  width: 100%;
  height: 250px;
  position: absolute;
  bottom: 0;
  left: 0;
  background: linear-gradient(180deg, rgba(4, 21, 45, 0) 0%, #04152d 79.17%);
`;

const Content = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  gap: 25px;

  @media ${QUERIES.tabletAndLarge} {
    gap: 50px;
    flex-direction: row;
  }
`;

const ContentLeft = styled.div`
  flex-shrink: 0;

  .posterImg {
    width: 100%;
    display: block;
    border-radius: 12px;

    @media ${QUERIES.tabletAndLarge} {
      max-width: 350px;
    }
  }
`;

const ContentRight = styled.div`
  color: white;
`;

const Title = styled.h1`
  font-size: ${28 / 16}rem;
  line-height: 40px;

  @media ${QUERIES.tabletAndLarge} {
    font-size: ${34 / 16}rem;
    line-height: 44px;
  }
`;

const SubTitle = styled.p`
  font-size: 1rem;
  line-height: 24px;
  margin-bottom: 15px;
  font-style: italic;
  opacity: 0.5;

  @media ${QUERIES.tabletAndLarge} {
    font-size: ${20 / 16}rem;
    line-height: 28px;
  }
`;

const GenresModified = styled(Genres)`
  margin-bottom: 25px;
  flex-flow: row wrap;
`;

const CircleRatingModified = styled(CircleRating)`
  max-width: 70px;
  background-color: var(--black2);

  @media ${QUERIES.tabletAndLarge} {
    max-width: 90px;
  }

  .CircularProgressbar-text {
    fill: white;
  }
`;

const Overview = styled.div`
  margin-bottom: 25px;
`;

const Heading = styled.h2`
  font-size: ${24 / 16}rem;
  margin-bottom: 10px;
`;

const Description = styled.p`
  line-height: 24px;

  @media ${QUERIES.tabletAndLarge} {
    padding-right: 100px;
  }
`;
const Text = styled.p`
  font-size: 20px;
  transition: all 0.7s ease-in-out;
`;
const PlayBtn = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  cursor: pointer;
  svg {
    width: 60px;
    @media ${QUERIES.tabletAndLarge} {
      width: 80px;
    }
  }

  .triangle {
    stroke-dasharray: 240;
    stroke-dashoffset: 480;
    stroke: white;
    transform: translateY(0);
    transition: all 0.7s ease-in-out;
  }
  .circle {
    stroke: white;
    stroke-dasharray: 650;
    stroke-dashoffset: 1300;
    transition: all 0.5s ease-in-out;
  }
  &:hover {
    ${Text} {
      color: var(--pink);
    }
    .triangle {
      stroke-dashoffset: 0;
      opacity: 1;
      stroke: var(--pink);
      animation: trailorPlay 0.7s ease-in-out;
    }
    .circle {
      stroke-dashoffset: 0;
      stroke: var(--pink);
    }
  }
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 25px;
  margin-bottom: 25px;
`;

const Info = styled.div`
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding: 15px 0;

  ${Text} {
    margin-right: 10px;
    opacity: 0.5;
    line-height: 24px;

    &.bold {
      font-weight: 600;
      opacity: 1;
    }
  }

  @media ${QUERIES.laptopAndLarge} {
    display: flex;
  }

  &:last-child {
    border-bottom: none;
  }
`;

const InfoItem = styled.div`
  margin-right: 10px;
  display: flex;
  flex-flow: row wrap;
  margin-bottom: 10px;
`;

const SkeletonWrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  gap: 25px;

  @media ${QUERIES.tabletAndLarge} {
    gap: 50px;
    flex-direction: row;
  }
`;

const SkeletonContentWrapper = styled(ContentWrapper)`
  display: flex;
  gap: 50px;
`;

const SkeletonLeft = styled.div`
  flex-shrink: 0;
  width: 100%;
  display: block;
  border-radius: 12px;
  aspect-ratio: 1/1.5;

  @media ${QUERIES.tabletAndLarge} {
    max-width: 350px;
  }
`;

const SkeletonRight = styled.div`
  width: 100%;

  ${Row} {
    width: 100%;
    height: 25px;
    margin-bottom: 20px;
    border-radius: 50px;
    &:nth-child(2) {
      width: 75%;
      margin-bottom: 50px;
    }

    &:nth-child(5) {
      width: 50%;
      margin-bottom: 50px;
    }
  }
`;

export default DetailsBanner;
