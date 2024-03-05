import React from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import { fetchData } from "./utils/api";
import { setApiConfiguration, setGenres } from "./store/homeSlice";

// components
import Header from "./components/header";
import Footer from "./components/footer";

// pages
import Home from "./pages/home";
import Details from "./pages/details";
import SearchResult from "./pages/search-result";
import Explore from "./pages/explore";
import PageNotFound from "./pages/page-not-found";

function App() {
  const dispatch = useDispatch();

  // fetch and set api configurations
  React.useEffect(() => {
    fetchData("/configuration").then((res) => {
      const base_url = res.images.secure_base_url;
      const backdrop_size = res.images.backdrop_sizes.at(-1);
      const poster_size = res.images.poster_sizes.at(-1);
      const profile_size = res.images.profile_sizes.at(-1);

      const urls = {
        backdrop: base_url + backdrop_size,
        poster: base_url + poster_size,
        profile: base_url + profile_size,
      };
      dispatch(setApiConfiguration(urls));
    });

    const genresCalls = async () => {
      const promises = [];
      const endPoints = ["movie", "tv"];
      const allGeneres = {};

      endPoints.forEach((endPoint) => {
        promises.push(fetchData(`/genre/${endPoint}/list`));
      });

      const data = await Promise.all(promises);
      data.forEach(({ genres }) => {
        genres.forEach((item) => {
          // allGeneres[item.id] = item.name;
          allGeneres[item.id] = item;
        });
      });
      dispatch(setGenres(allGeneres));
    };

    genresCalls();
  }, []);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:mediaType/:id" element={<Details />} />
        <Route path="/explore/:mediaType" element={<Explore />} />
        <Route path="/search/:query" element={<SearchResult />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
