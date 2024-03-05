import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { QUERIES } from "../../constants";

const Genres = ({ genreIds, className }) => {
  const { genres } = useSelector((state) => state.home);

  if (!genres) return;

  return (
    <Wrapper className={className}>
      {genreIds?.map((genreId) => (
        <Genre key={genreId}>{genres[genreId]?.name}</Genre>
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  gap: 5px;
`;

const Genre = styled.div`
  background-color: var(--pink);
  padding: 3px 5px;
  font-size: ${12 / 16}rem;
  color: white;
  border-radius: 4px;
  white-space: nowrap;
`;

export default Genres;
