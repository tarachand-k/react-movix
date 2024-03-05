import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import useFetch from "../../hooks/useFetch";
import DetailsBanner from "./DetailsBanner";
import Cast from "./cast";
import VideosSection from "./videos-section";
import SimilarSection from "./similar-section";
import Recommendations from "./recommendations";

const Details = () => {
  const { mediaType, id } = useParams();
  const [videos, videosLoading, error] = useFetch(`/${mediaType}/${id}/videos`);
  const [credits, creditsLoading] = useFetch(`/${mediaType}/${id}/credits`);

  return (
    <>
      <DetailsBanner trailer={videos?.results?.[0]} crew={credits?.crew} />
      <Cast casts={credits?.cast} loading={creditsLoading} />
      <VideosSection videos={videos?.results} loading={videosLoading} />
      <SimilarSection mediaType={mediaType} id={id} />
      <Recommendations mediaType={mediaType} id={id} />
    </>
  );
};

export default Details;
