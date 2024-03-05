import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import styled from "styled-components";
import { QUERIES } from "../../constants";

const CircleRating = ({ rating, className }) => {
  return (
    <Wrapper className={className}>
      <CircularProgressbar
        value={rating}
        maxValue={10}
        text={rating}
        styles={buildStyles({
          pathColor: rating < 5 ? "red" : rating < 7 ? "orange" : "green",
        })}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: var(--black);
  border-radius: 50%;
  padding: 2px;

  .CircularProgressbar-text {
    font-size: ${34 / 16}rem;
    font-weight: 700;
    fill: var(--black);
  }

  .CircularProgressbar-trail {
    stroke: transparent;
  }
`;

export default CircleRating;
