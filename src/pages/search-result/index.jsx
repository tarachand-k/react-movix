import React from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import styled from "styled-components";

import { fetchData } from "../../utils/api";
import { QUERIES } from "../../constants";

import ContentWrapper from "../../components/content-wrapper";
import MovieCard from "../../components/MovieCard";
import Spinner from "../../components/spinner";
import LazyImage from "../../components/lazy-image";

const SearchResult = () => {
  const [data, setData] = React.useState(null);
  const [pageNum, setPageNum] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const { query } = useParams();

  const totalPages = React.useRef();

  React.useEffect(() => {
    setLoading(true);
    fetchData(`/search/multi?query=${query}&page=1`).then((res) => {
      setData(res?.results);
      totalPages.current = res.total_pages;
      setPageNum(2);
      setLoading(false);
    });
  }, [query]);

  const fetchNextPageData = async () => {
    const res = await fetchData(`/search/multi?query=${query}&page=${pageNum}`);
    setData((curr) => [...curr, ...res.results]);
    setPageNum((curr) => curr + 1);
  };

  const title = `Search result${
    totalPages.current > 1 ? "s" : ""
  } of '${query}'`;

  return (
    <Wrapper>
      {loading && <Spinner initial={true} />}
      {!loading && (
        <ContentWrapper>
          {data?.length > 0 ? (
            <>
              <Title>{title}</Title>
              <InfiniteScroll
                className="content"
                dataLength={data?.length || 0}
                next={fetchNextPageData}
                hasMore={pageNum <= totalPages.current}
                loader={<Spinner />}
              >
                {data.map((item, idx) => {
                  if (item.media_type === "person") return;
                  return <MovieCard key={idx} item={item} />;
                })}
              </InfiniteScroll>
            </>
          ) : (
            <ResultNotFonund>
              <Text>
                No results for{" "}
                <span style={{ color: "var(--orange)" }}>'{query}'</span>
              </Text>
              <LazyImage
                style={{ width: "100%", height: "100%" }}
                src="/no-results.png"
              />
            </ResultNotFonund>
          )}
        </ContentWrapper>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  min-height: 700px;
  padding-top: 100px;
  color: white;

  .content {
    display: flex;
    flex-flow: row wrap;
    gap: 10px;
    margin-bottom: 50px;
    @media ${QUERIES.tabletAndLarge} {
      gap: 20px;
    }
  }
`;

const ResultNotFonund = styled.div`
  width: 100%;
  font-size: ${24 / 16}rem;
  color: white;
  font-weight: normal;

  display: flex;
  align-items: center;

  flex-direction: column;

  .lazy-load-image-background {
    width: 100%;
    height: 100%;

    img {
      display: block;
      margin: 0 auto;
      width: 100%;

      @media ${QUERIES.mobileAndLarge} {
        width: 80%;
        margin-top: -20px;
      }

      @media ${QUERIES.laptopAndLarge} {
        width: 60%;
      }
    }
  }
`;

const Text = styled.p``;

const Title = styled.h1`
  font-size: ${24 / 16}rem;
  line-height: 34px;
  color: white;
  margin-bottom: 25px;
  font-weight: 600;
`;

export default SearchResult;
