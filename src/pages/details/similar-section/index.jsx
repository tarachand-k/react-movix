import React from "react";
import useFetch from "../../../hooks/useFetch";
import Carousel from "../../../components/carousel";
import styled from "styled-components";

const SimilarSection = ({ mediaType, id }) => {
  const [data, loading, error] = useFetch(`/${mediaType}/${id}/similar`);

  const title = `Similar ${mediaType === "tv" ? "TV Shows" : "Movies"}`;

  if (!data || data?.results?.length === 0) return;

  return (
    <Wrapper>
      <Carousel
        title={title}
        mediaType={mediaType}
        data={data?.results}
        loading={loading}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default SimilarSection;
