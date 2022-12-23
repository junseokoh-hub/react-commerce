import React from "react";
import { Helmet } from "react-helmet-async";
import { useQuery } from "react-query";
import Posts from "../components/Posts/Posts";
import { fetchProducts } from "../lib/api";
import LoadingSpinner from "../utils/LoadingSpinner";

const ProductsPage = () => {
  const { isLoading, data, isError, error } = useQuery(
    ["productsPage", "products"],
    fetchProducts,
  );

  if (isLoading) return <LoadingSpinner />;

  if (isError) return <div>{error.toString()}</div>;

  return (
    <>
      <Helmet>
        <title>상품</title>
      </Helmet>
      <Posts posts={data} />
    </>
  );
};

export default ProductsPage;
