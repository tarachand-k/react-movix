import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import useFetch from "../../hooks/useFetch";
import LazyImage from "../lazy-image";
import ContentWrapper from "../content-wrapper";
import { QUERIES } from "../../constants";

const Hero = () => {
  const [backgroundImg, setBackgroundImg] = React.useState("");
  const [query, setQuery] = React.useState("");
  const navigate = useNavigate();
  const { imgUrls } = useSelector((state) => state.home);
  const [data, loading, error] = useFetch("/movie/upcoming");

  React.useEffect(() => {
    const randomIdx = Math.floor(Math.random() * 20);
    const bg = imgUrls.backdrop + data?.results[randomIdx]?.backdrop_path;
    setBackgroundImg(bg);
  }, [data, imgUrls]);

  const handleSumbit = (event) => {
    event.preventDefault();
    if (!(query.length > 3)) return;

    navigate(`/search/${query}`);
  };

  if (error) return <p>{error}</p>;
  if (loading) return <h1>Loadding...</h1>;

  return (
    <Wrapper>
      {!loading && (
        <BackdropImg>
          <LazyImage src={backgroundImg ? backgroundImg : ""} />
        </BackdropImg>
      )}

      <OpacityLayer />

      <ContentWrapper>
        <HeroContent>
          <Title>Welcome.</Title>
          <SubTitle>
            Millions of movies, TV shows and people to discover. Explore now.
          </SubTitle>
          <SearchWrapper onSubmit={handleSumbit}>
            <SearchInput
              type="text"
              placeholder="Search for a movie or tv show..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            <SearchButton type="submit">Search</SearchButton>
          </SearchWrapper>
        </HeroContent>
      </ContentWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  width: 100%;
  height: 450px;
  background-color: var(--black);
  display: flex;
  align-items: center;
  position: relative;

  @media ${QUERIES.tabletAndLarge} {
    height: 700px;
  }
`;

const BackdropImg = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0.5;
  overflow: hidden;

  span {
    width: 100%;
    height: 100%;
    display: block;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
`;

const OpacityLayer = styled.div`
  width: 100%;
  height: 250px;
  background: linear-gradient(180deg, rgba(4, 21, 45, 0) 0%, #04152d 79.17%);
  position: absolute;
  bottom: 0;
  left: 0;
`;

const HeroContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  text-align: center;
  position: relative;
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: ${50 / 16}rem;
  font-weight: 700;
  margin-bottom: 10px;

  @media ${QUERIES.tabletAndLarge} {
    margin-bottom: 0;
  }
`;

const SubTitle = styled.p`
  font-size: ${18 / 16}rem;
  font-weight: 500;
  margin-bottom: 40px;
  @media ${QUERIES.tabletAndLarge} {
    font-size: ${24 / 16}rem;
  }
`;

const SearchWrapper = styled.form`
  display: flex;
  align-items: center;
  width: 100%;
`;

const SearchInput = styled.input`
  width: calc(100% - 100px);
  height: 50px;
  background-color: white;
  outline: 0;
  border: 0;
  border-radius: 30px 0 0 30px;
  padding: 0 18px;
  font-size: ${14 / 16}rem;

  @media ${QUERIES.tabletAndLarge} {
    width: calc(100% - 150px);
    height: 60px;
    font-size: ${20 / 16}rem;
    padding: 0 30px;
  }
`;

const SearchButton = styled.button`
  width: 100px;
  height: 50px;
  background: var(--gradient);
  color: white;
  outline: 0;
  border: 0;
  border-radius: 0 30px 30px 0;
  font-size: 1rem;
  cursor: pointer;
  @media ${QUERIES.tabletAndLarge} {
    width: 150px;
    height: 60px;
    font-size: ${18 / 16}rem;
  }
`;

export default Hero;
