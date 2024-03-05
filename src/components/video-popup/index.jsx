import React from "react";
import ReactPlayer from "react-player";
import styled from "styled-components";

const VideoPopup = ({ show, setShow, videoId }) => {
  const hidePopup = () => {
    setShow(false);
  };
  return (
    <Wrapper className={show ? "visible" : ""}>
      <OpacityLayer onClick={hidePopup} />
      <VideoPlayer>
        <CloseBtn onClick={hidePopup}>Close</CloseBtn>
        {show && (
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${videoId}`}
            controls
            width="100%"
            height="100%"
            playing={true}
          />
        )}
      </VideoPlayer>
    </Wrapper>
  );
};

const VideoPlayer = styled.div`
  position: relative;
  width: 800px;
  aspect-ratio: 16 / 9;
  background-color: var(--black);
  transform: scale(0.2);
`;

const OpacityLayer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(3.5px);
  -webkit-backdrop-filter: blur(3.5px);
  opacity: 0;
  transition: opacity 400ms;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  display: none;
  left: 0;
  /* visibility: hidden; */
  z-index: 9;

  &.visible {
    opacity: 1;
    /* visibility: visible; */
    display: flex;

    ${OpacityLayer} {
      opacity: 1;
    }
    ${VideoPlayer} {
      transform: scale(1);
    }
  }
`;

const CloseBtn = styled.div`
  position: absolute;
  top: -20px;
  right: 0;
  color: white;
  cursor: pointer;
`;

export default VideoPopup;
