import React from "react";
import useFetch from "../../../hooks/useFetch";
import Carousel from "../../../components/carousel";

const Recommendations = ({ mediaType, id }) => {
  const [data, loading, error] = useFetch(
    `/${mediaType}/${id}/recommendations`
  );

  if (!data || data?.results?.length === 0) return;
  return (
    <Carousel
      title={"Recommendations"}
      mediaType={mediaType}
      data={data?.results}
      loading={loading}
    />
  );
};

export default Recommendations;
