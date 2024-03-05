import { useState, useEffect } from "react";
import { fetchData } from "../utils/api";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setData(null);
    setError(null);

    fetchData(url)
      .then((res) => {
        setData(res);
      })
      .catch((err) => {
        setError("Something went wrong!, Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [url]);

  return [data, loading, error];
};

export default useFetch;
