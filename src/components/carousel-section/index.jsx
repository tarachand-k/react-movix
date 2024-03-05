import React from "react";
import styled from "styled-components";

import ContentWrapper from "../content-wrapper";
import SwitchTabs from "../switch-tabs";
import useFetch from "../../hooks/useFetch";
import Carousel from "../carousel";

const CarouselSection = ({ title, tabs }) => {
  const titleSnakeCase = title.toLowerCase().split(" ").join("_");
  const [endpoint, setEndpoint] = React.useState(() =>
    titleSnakeCase === "trending" ? "day" : "movie"
  );

  // becuase api for trending is different
  const url =
    title.toLowerCase() === "trending"
      ? `/trending/all/${endpoint}`
      : `/${endpoint}/${titleSnakeCase}`;

  const [data, loading, error] = useFetch(url);

  const handleTabChange = (tab) => {
    if (titleSnakeCase === "trending") {
      return setEndpoint(tab === tabs[0] ? "day" : "week");
    } else {
      return setEndpoint(tab === tabs[0] ? "movie" : "tv");
    }
  };

  if (!data) return;

  return (
    <Wrapper>
      <Header>
        <Title>{title}</Title>
        <SwitchTabs tabs={tabs} onTabChange={handleTabChange} />
      </Header>

      <Carousel data={data?.results} loading={loading} mediaType={endpoint} />
    </Wrapper>
  );
};

const Wrapper = styled.section`
  position: relative;
  margin-bottom: 70px;
`;

const Header = styled(ContentWrapper)`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  font-size: ${24 / 16}rem;
  color: white;
`;

export default React.memo(CarouselSection);
