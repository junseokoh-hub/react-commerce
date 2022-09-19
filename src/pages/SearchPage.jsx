import React from "react";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import Posts from "../components/Posts/Posts";
import { useTitle } from "../hooks/useTitle";
import { Kakao } from "../lib/api";

const SearchPage = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  useTitle("Search");

  const { data, isLoading, isError, error } = useQuery(["books"], async () => {
    const response = await Kakao.get(
      `/v3/search/book?query=${query.get("keyword")}&size=50`,
    );
    return response;
  });

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>{error.toString()}</div>;
  console.log(data.data.documents);

  return <Posts posts={data.data.documents} />;
};

export default SearchPage;
