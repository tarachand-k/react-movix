import React from "react";
import styled from "styled-components";
import ContentWrapper from "../../../components/content-wrapper";
import LazyImage from "../../../components/lazy-image";
import { useSelector } from "react-redux";
import { QUERIES } from "../../../constants";

const Cast = ({ casts, loading }) => {
  const { imgUrls } = useSelector((state) => state.home);
  if (!casts || casts.length === 0) return;
  return (
    <Wrapper>
      <ContentWrapper>
        <Heading>Top Cast</Heading>
        {loading && (
          <SkeletonCast>
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
          </SkeletonCast>
        )}
        {!loading && casts && (
          <CastItems>
            {casts?.map((item) => {
              const profileImg = item?.profile_path
                ? imgUrls.profile + item.profile_path
                : "/avatar.png";

              return (
                <CastItem key={item.id}>
                  <ProfileImg>
                    <LazyImage src={profileImg} />
                  </ProfileImg>
                  <Name>{item.name}</Name>
                  <Character>{item.character}</Character>
                </CastItem>
              );
            })}
          </CastItems>
        )}
      </ContentWrapper>
    </Wrapper>
  );
};

const skeleton = () => {
  return (
    <SkeletonItem>
      <Circle className="skeleton"></Circle>
      <Row className="skeleton"></Row>
      <Row className="skeleton"></Row>
    </SkeletonItem>
  );
};

const Wrapper = styled.section`
  position: relative;
  margin-bottom: 50px;
`;

const Heading = styled.h2`
  font-size: ${24 / 16}rem;
  color: white;
  margin-bottom: 25px;
`;

const CastItems = styled.div`
  display: flex;
  gap: 20px;
  overflow-y: hidden;
  margin-right: -20px;
  margin-left: -20px;
  padding: 0 20px;

  @media ${QUERIES.tabletAndLarge} {
    margin: 0;
    padding: 0;
  }
`;

const CastItem = styled.div`
  text-align: center;
  color: white;
`;

const ProfileImg = styled.div`
  width: 125px;
  height: 125px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 15px;
  @media ${QUERIES.tabletAndLarge} {
    width: 175px;
    height: 175px;
    margin-bottom: 25px;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center top;
    display: block;
  }
`;

const Name = styled.div`
  font-size: 14px;
  line-height: 20px;
  font-weight: 600;
  @media ${QUERIES.tabletAndLarge} {
    font-size: 18px;
    line-height: 24px;
  }
`;

const Character = styled.div`
  font-size: 14px;
  line-height: 20px;
  opacity: 0.5;
  @media ${QUERIES.tabletAndLarge} {
    font-size: 16px;
    line-height: 24px;
  }
`;

const SkeletonCast = styled.div`
  display: flex;
  gap: 20px;
  overflow-y: hidden;
  margin-right: -20px;
  margin-left: -20px;
  padding: 0 20px;

  @media ${QUERIES.tabletAndLarge} {
    margin: 0;
    padding: 0;
  }
`;

const SkeletonItem = styled.div``;

const Circle = styled.div`
  width: 125px;
  height: 125px;
  border-radius: 50%;
  margin-bottom: 15px;

  @media ${QUERIES.tabletAndLarge} {
    width: 175px;
    height: 175px;
    margin-bottom: 25px;
  }
`;

const Row = styled.div`
  width: 100%;
  height: 20px;
  border-radius: 10px;
  margin-bottom: 10px;

  &:last-of-type {
    width: 75%;
    margin: 0 auto;
  }
`;

export default Cast;
