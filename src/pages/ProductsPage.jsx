import React from "react";
import { useQuery } from "react-query";
import Posts from "../components/Posts/Posts";
import { useTitle } from "../hooks/useTitle";
import { fetchProducts } from "../lib/api";
import LoadingSpinner from "../utils/LoadingSpinner";

const ProductsPage = () => {
  useTitle("Products");

  const { isLoading, data, isError, error } = useQuery(
    ["productsPage", "products"],
    fetchProducts,
    {
      keepPreviousData: true,
    },
  );

  if (isLoading) return <LoadingSpinner />;

  if (isError) return <div>{error.toString()}</div>;

  return <Posts posts={data} />;
};

export default ProductsPage;
