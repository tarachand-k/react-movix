import { useState } from "react";
import styled from "styled-components";

import ContentWrapper from "../../../components/content-wrapper";
import SwitchTabs from "../../../components/switch-tabs";
import useFetch from "../../../hooks/useFetch";
import Carousel from "../../../components/carousel";

const Trending = () => {
  const [endpoint, setEndpoint] = useState("day");

  const [data, loading] = useFetch(`/trending/movie/${endpoint}`);

  const onTabChange = (tab) => {
    setEndpoint(tab === "Day" ? "day" : "week");
  };

  return (
    <Wrapper>
      <Header>
        <Title>Trending</Title>
        <SwitchTabs tabs={["Day", "Week"]} onTabChange={onTabChange} />
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

export default Trending;
