import React from "react";
import styled from "styled-components";

const Spinner = ({ initial }) => {
  return (
    <Wrapper className={initial ? "initial" : ""}>
      <SpinnerSvg viewBox="0 0 50 50">
        <Circle cx="25" cy="25" r="20" fill="none" strokeWidth="5"></Circle>
      </SpinnerSvg>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 150px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  &.initial {
    height: 700px;
  }
`;

const SpinnerSvg = styled.svg`
  animation: rotate 2s linear infinite;
  z-index: 2;
  width: 50px;
  height: 50px;

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Circle = styled.circle`
  stroke: white;
  stroke-linecap: round;
  animation: dash 1.5s ease-in-out infinite;

  @keyframes dash {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  }
`;

export default Spinner;
