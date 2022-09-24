import React from "react";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import Posts from "../components/Posts/Posts";
import { useTitle } from "../hooks/useTitle";
import { fetchSearchBooks } from "../lib/api";
import LoadingSpinner from "../utils/LoadingSpinner";

const SearchPage = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const keyword = query.get("keyword");
  useTitle(`Search / ${keyword}`);
  const { data, isLoading, isError, error } = useQuery(["books", keyword], () =>
    fetchSearchBooks(keyword),
  );

  if (isLoading) return <LoadingSpinner />;

  if (isError) return <div>{error.toString()}</div>;

  return <Posts posts={data?.data?.documents} />;
};

export default SearchPage;
