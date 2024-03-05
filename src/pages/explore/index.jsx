import React, { useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import Select from "react-select";

import useFetch from "../../hooks/useFetch";
import { fetchData } from "../../utils/api";
import ContentWrapper from "../../components/content-wrapper";
import MovieCard from "../../components/MovieCard";
import Spinner from "../../components/spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import { QUERIES } from "../../constants";

let filters = {};

const sortbyData = [
  { value: "popularity.desc", label: "Popularity Descending" },
  { value: "popularity.asc", label: "Popularity Ascending" },
  { value: "vote_average.desc", label: "Rating Descending" },
  { value: "vote_average.asc", label: "Rating Ascending" },
  {
    value: "primary_release_date.desc",
    label: "Release Date Descending",
  },
  { value: "primary_release_date.asc", label: "Release Date Ascending" },
  { value: "original_title.asc", label: "Title (A-Z)" },
];

const Explore = () => {
  const [data, setData] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const [genre, setGenre] = useState(null);
  const [sortby, setSortby] = useState(null);
  const { mediaType } = useParams();
  const totalPages = React.useRef();

  const [genresData] = useFetch(`/genre/${mediaType}/list`);

  const fetchInitialData = async () => {
    setLoading(true);
    const res = await fetchData(`/discover/${mediaType}`, filters);
    setData(res?.results);
    setPageNum((prev) => prev + 1);
    totalPages.current = res?.total_pages;
    setLoading(false);
  };

  const fetchNextPageData = async () => {
    const res = await fetchData(
      `/discover/${mediaType}?page=${pageNum}`,
      filters
    );
    if (res?.results) setData([...data, ...res?.results]);
    setPageNum((prev) => prev + 1);
  };

  React.useEffect(() => {
    filters = {};
    setData(null);
    setPageNum(1);
    setSortby(null);
    setGenre(null);
    fetchInitialData();
  }, [mediaType]);

  const onChange = (selectedItems, action) => {
    if (action.name === "sortby") {
      setSortby(selectedItems);
      if (action.action !== "clear") {
        filters.sort_by = selectedItems.value;
      } else {
        delete filters.sort_by;
      }
    }

    if (action.name === "genres") {
      setGenre(selectedItems);
      if (action.action !== "clear") {
        let genreId = selectedItems.map((g) => g.id);
        genreId = JSON.stringify(genreId).slice(1, -1);
        filters.with_genres = genreId;
      } else {
        delete filters.with_genres;
      }
    }

    setPageNum(1);
    fetchInitialData();
  };
  return (
    <Wrapper>
      <ContentWrapper>
        <Header>
          <Title>Explore {mediaType === "tv" ? "TV Shows" : "Movies"}</Title>
          <Filters>
            <Select
              isMulti
              name="genres"
              value={genre}
              closeMenuOnScroll={false}
              options={genresData?.genres}
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option.id}
              onChange={onChange}
              placeholder="Select genres"
              className="react-select-container genresDD"
              classNamePrefix="react-select"
            />
            <Select
              name="sortby"
              value={sortby}
              options={sortbyData}
              onChange={onChange}
              isClearable={true}
              placeholder="Sort by"
              className="react-select-container sortbyDD"
              classNamePrefix="react-select"
            />
          </Filters>
        </Header>
        {loading && <Spinner initial={true} />}
        {!loading && (
          <>
            {data?.length > 0 ? (
              <InfiniteScroll
                className="content"
                dataLength={data?.length || 0}
                next={fetchNextPageData}
                hasMore={pageNum <= totalPages.current}
                loader={<Spinner />}
              >
                {data?.map((item, idx) => {
                  if (item.media_type === "person") return;
                  return (
                    <MovieCard
                      key={idx}
                      item={item}
                      mediaType={mediaType}
                      isOnlyCard={false}
                    />
                  );
                })}
              </InfiniteScroll>
            ) : (
              <ResultNotFonund>No Results found!</ResultNotFonund>
            )}
          </>
        )}
      </ContentWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  min-height: 700px;
  padding-top: 100px;

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

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
  flex-direction: column;

  @media ${QUERIES.tabletAndLarge} {
    flex-direction: row;
  }
`;

const Title = styled.h1`
  font-size: ${24 / 16}rem;
  color: white;
  font-weight: 800;

  line-height: 34px;
  margin-bottom: 24px;
  @media ${QUERIES.tabletAndLarge} {
    margin-bottom: 0;
  }
`;

const Filters = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
  @media ${QUERIES.tabletAndLarge} {
    flex-direction: row;
  }

  .react-select-container {
    &.genresDD {
      width: 100%;
      @media ${QUERIES.tabletAndLarge} {
        max-width: 500px;
        min-width: 250px;
      }
    }
    &.sortbyDD {
      width: 100%;
      flex-shrink: 0;
      @media ${QUERIES.tabletAndLarge} {
        width: 250px;
      }
    }

    .react-select__control {
      border: 0;
      outline: 0;
      box-shadow: none;
      background-color: var(--black-light);
      border-radius: 20px;
      .react-select__value-container {
        .react-select__placeholder,
        .react-select__input-container {
          color: white;
          margin: 0 10px;
        }
      }
      .react-select__single-value {
        color: white;
      }
      .react-select__multi-value {
        background-color: var(--black3);
        border-radius: 10px;
        .react-select__multi-value__label {
          color: white;
        }
        .react-select__multi-value__remove {
          background-color: transparent;
          color: white;
          cursor: pointer;
          &:hover {
            color: var(--black-lighter);
          }
        }
      }
    }
    .react-select__menu {
      top: 40px;
      margin: 0;
      padding: 0;
    }
  }
`;

const ResultNotFonund = styled.p`
  font-size: ${24 / 16}rem;
  /* color: var(--black-light); */
  color: var(--orange);
  color: white;
  font-weight: normal;
`;

export default Explore;
