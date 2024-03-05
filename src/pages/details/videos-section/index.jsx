import React from "react";
import styled from "styled-components";

import ContentWrapper from "../../../components/content-wrapper";
import { PlayIcon } from "../PlayIcon";

import VideoPopup from "../../../components/video-popup";
import LazyImage from "../../../components/lazy-image";
import { QUERIES } from "../../../constants";

const VideosSection = ({ videos, loading }) => {
  const [showVideo, setShowVideo] = React.useState(false);
  const [videoId, setVideoId] = React.useState(null);

  if (!videos || videos.length === 0) return;
  return (
    <Wrapper>
      <ContentWrapper>
        <Heading>Official Videos</Heading>
        {loading && (
          <VideoSkeleton>
            {loadingSkeleton()}
            {loadingSkeleton()}
            {loadingSkeleton()}
            {loadingSkeleton()}
          </VideoSkeleton>
        )}
        {!loading && videos && (
          <Videos>
            {videos.map((video) => (
              <VideoItem
                key={video.id}
                onClick={() => {
                  setShowVideo(true);
                  setVideoId(video.key);
                }}
              >
                <VideoThumbnail>
                  <LazyImage
                    src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}
                  />
                  <PlayIcon />
                </VideoThumbnail>
                <VideoTitle>{video.name}</VideoTitle>
              </VideoItem>
            ))}
          </Videos>
        )}
      </ContentWrapper>
      <VideoPopup show={showVideo} setShow={setShowVideo} videoId={videoId} />
    </Wrapper>
  );
};

const loadingSkeleton = () => {
  return (
    <SkeletonItem>
      <Thumb className="skeleton"></Thumb>
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
  font-size: 24px;
  color: white;
  margin-bottom: 25px;
`;

const Videos = styled.div`
  display: flex;
  gap: 10px;
  overflow-x: auto;
  margin-right: -20px;
  margin-left: -20px;
  padding: 0 20px;
  @media ${QUERIES.tabletAndLarge} {
    gap: 20px;
    margin: 0;
    padding: 0;
  }
`;

const VideoItem = styled.div`
  width: 150px;
  flex-shrink: 0;
  @media ${QUERIES.tabletAndLarge} {
    width: 25%;
  }
  cursor: pointer;
`;

const VideoThumbnail = styled.div`
  margin-bottom: 15px;
  position: relative;
  img {
    width: 100%;
    display: block;
    border-radius: 12px;
    transition: all 0.7s ease-in-out;
  }
  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50px;
    height: 50px;
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
    img {
      opacity: 0.5;
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

const VideoTitle = styled.h3`
  color: white;
  font-size: 14px;
  line-height: 20px;
  @media ${QUERIES.tabletAndLarge} {
    font-size: 16px;
    line-height: 24px;
  }
`;

const VideoSkeleton = styled.div`
  display: flex;
  gap: 10px;
  overflow-x: auto;
  margin-right: -20px;
  margin-left: -20px;
  padding: 0 20px;
  @media ${QUERIES.tabletAndLarge} {
    gap: 20px;
    margin: 0;
    padding: 0;
  }
`;

const SkeletonItem = styled.div`
  .skItem {
    width: 150px;
    flex-shrink: 0;
    @media ${QUERIES.tabletAndLarge} {
      width: 25%;
    }
  }
`;

const Thumb = styled.div`
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 12px;
  margin-bottom: 10px;
`;

const Row = styled.div`
  height: 20px;
  width: 100%;
  border-radius: 10px;
  margin-bottom: 10px;

  &:last-of-type {
    height: 20px;
    width: 75%;
    border-radius: 10px;
  }
`;

export default VideosSection;
