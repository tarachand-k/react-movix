import React from "react";
import styled from "styled-components";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";

import ContentWrapper from "../content-wrapper";
import { QUERIES } from "../../constants";
import MovieCard from "../MovieCard";

const Carousel = ({ title, data, loading, mediaType }) => {
  const carouselRef = React.useRef();

  const handleCarouselScroll = (direction) => {
    const container = carouselRef.current;

    const scrollAmount =
      direction === "left"
        ? container.scrollLeft - (container.offsetWidth + 20)
        : container.scrollLeft + (container.offsetWidth + 20);

    container.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <Wrapper>
      <CarouselContent>
        {title && (
          // <Header>
          <CarouselTitle>{title}</CarouselTitle>
          // </Header>
        )}
        <BsFillArrowLeftCircleFill
          className="carouselLeftNav arrow"
          onClick={() => handleCarouselScroll("left")}
        />
        <BsFillArrowRightCircleFill
          className="carouselRightNav arrow"
          onClick={() => handleCarouselScroll("right")}
        />

        {loading && (
          <LoadingSkeleton>
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
          </LoadingSkeleton>
        )}
        {!loading && data && (
          <CarouselItems ref={carouselRef}>
            {data?.map((item) => (
              <MovieCard
                isOnlyCard={false}
                mediaType={mediaType}
                item={item}
                key={item.id}
              />
            ))}
          </CarouselItems>
        )}
      </CarouselContent>
    </Wrapper>
  );
};

const skItem = () => {
  return (
    <SkeletonItem>
      <PosterBlock className="skeleton"></PosterBlock>
      <TextBlock>
        <Title className="skeleton"></Title>
        <Date className="skeleton"></Date>
      </TextBlock>
    </SkeletonItem>
  );
};

const Wrapper = styled.div`
  margin-bottom: 50px;

  .arrow {
    font-size: 30px;
    color: white;
    position: absolute;
    top: 44%;
    transform: translateY(-50%);
    cursor: pointer;
    opacity: 0.6;
    z-index: 1;
    display: none;
    @media ${QUERIES.tabletAndLarge} {
      display: block;
    }
    &:hover {
      opacity: 0.8;
    }
  }
  .carouselLeftNav {
    left: 30px;
  }
  .carouselRightNav {
    right: 30px;
  }
`;

const CarouselTitle = styled.h2`
  font-size: ${24 / 16}rem;
  color: white;
  margin-bottom: 25px;
`;

const CarouselContent = styled(ContentWrapper)`
  position: relative;
`;

const CarouselItems = styled.div`
  display: flex;
  gap: 10px;
  overflow-y: hidden;
  margin-right: -20px;
  margin-left: -20px;
  padding: 0 20px;

  @media ${QUERIES.tabletAndLarge} {
    gap: 20px;
    overflow: hidden;
    margin: 0;
    padding: 0;
  }
`;

const PosterBlock = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1.5;
  background-size: cover;
  background-position: center;
  margin-bottom: 30px;
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

const LoadingSkeleton = styled.div`
  display: flex;
  gap: 10px;
  overflow-y: hidden;
  margin-right: -20px;
  margin-left: -20px;
  padding: 0 20px;
  @media ${QUERIES.tabletAndLarge} {
    gap: 20px;
    overflow: hidden;
    margin: 0;
    padding: 0;
  }
`;

const SkeletonItem = styled.div`
  width: 125px;
  @media ${QUERIES.tabletAndLarge} {
    width: calc(25% - 15px);
  }
  @media ${QUERIES.laptopAndLarge} {
    width: calc(20% - 16px);
  }
  flex-shrink: 0;

  ${PosterBlock} {
    border-radius: 12px;
    width: 100%;
    aspect-ratio: 1 / 1.5;
    margin-bottom: 30px;
  }

  ${TextBlock} {
    display: flex;
    flex-direction: column;
    ${Title} {
      width: 100%;
      height: 20px;
      margin-bottom: 10px;
    }
    ${Date} {
      width: 75%;
      height: 20px;
    }
  }
`;

export default Carousel;
