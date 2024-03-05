import React from "react";
import styled from "styled-components";
import Hero from "../../components/hero";
import Trending from "./trending";
import Popular from "./popular";
import TopRated from "./top-rated";

const Home = () => {
  return (
    <Wrapper>
      <Hero />
      <Trending />
      <Popular />
      <TopRated />
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default Home;
