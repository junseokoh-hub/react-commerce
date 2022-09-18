import React from "react";
import Posts from "../components/Posts/Posts";
import { useTitle } from "../hooks/useTitle";

const ProductsPage = () => {
  useTitle("Products");

  return <Posts />;
};

export default ProductsPage;
