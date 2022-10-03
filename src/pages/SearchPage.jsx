import React from "react";
import { Helmet } from "react-helmet-async";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import Posts from "../components/Posts/Posts";
import { fetchSearchBooks } from "../lib/api";
import LoadingSpinner from "../utils/LoadingSpinner";

const SearchPage = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const keyword = query.get("keyword");
  const { data, isLoading, isError, error } = useQuery(["books", keyword], () =>
    fetchSearchBooks(keyword),
  );

  if (isLoading) return <LoadingSpinner />;

  if (isError) return <div>{error.toString()}</div>;

  return (
    <>
      <Helmet>
        <title>{`검색 / ${keyword}`}</title>
      </Helmet>
      <Posts posts={data?.data?.documents} />
    </>
  );
};

export default SearchPage;
