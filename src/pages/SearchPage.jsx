import React from "react";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import Posts from "../components/Posts/Posts";
import { useTitle } from "../hooks/useTitle";
import { fetchSearchBooks } from "../lib/api";
import LoadingSpinner from "../utils/LoadingSpinner";

const SearchPage = () => {
  useTitle("Search");
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  const { data, isLoading, isError, error } = useQuery(
    ["books", query.get("keyword")],
    () => fetchSearchBooks(query.get("keyword")),
  );

  if (isLoading) return <LoadingSpinner />;

  if (isError) return <div>{error.toString()}</div>;

  return <Posts posts={data.data.documents} />;
};

export default SearchPage;
