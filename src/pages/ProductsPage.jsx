import React, { useState } from "react";
import { useQuery } from "react-query";
import Posts from "../components/Posts/Posts";
import { useTitle } from "../hooks/useTitle";
import { fetchProducts } from "../lib/api";

const ProductsPage = () => {
  const [limit, setLimit] = useState(4);
  const [page, setPage] = useState(1);

  const offset = (page - 1) * limit;

  const { isLoading, data, isError, error } = useQuery(
    ["productsPage", "products"],
    fetchProducts,
    {
      keepPreviousData: true,
    },
  );

  useTitle("Products");
  return <Posts />;
};

export default ProductsPage;
