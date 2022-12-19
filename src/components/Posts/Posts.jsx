import React, { useState } from "react";
import styled from "styled-components";
import Pagination from "./Pagination";
import ProductsList from "../Products/ProductsList";
import SelectOptions from "./SelectOptions";

const ProductsWrapper = styled.section`
  margin: 0 auto;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProductsContainer = styled.section`
  margin: 40px 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
`;

const PageSelectContainer = styled.ul`
  margin: 30px 0;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  @media screen and (max-width: 480px) {
    margin: 30px 0 0 0;
  }
`;

const limitOptions = [
  { value: 4, content: "4" },
  { value: 10, content: "10" },
  { value: 20, content: "20" },
  { value: 50, content: "50" },
  { value: 100, content: "100" },
];

const orderOptions = [
  { value: "asc", content: "오름차순" },
  { value: "desc", content: "내림차순" },
];

const Posts = ({ posts }) => {
  const [limit, setLimit] = useState(4);
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState("asc");

  const offset = (page - 1) * limit;

  const filteredPosts = posts
    ?.sort((a, b) => {
      if (order === "asc") {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0);
      } else if (order === "desc") {
        return b.title.charCodeAt(0) - a.title.charCodeAt(0);
      }
      return null;
    })
    ?.slice(offset, offset + limit);

  return (
    <ProductsWrapper>
      <PageSelectContainer>
        <SelectOptions
          value={limit}
          setValue={setLimit}
          options={limitOptions}
        />
        <SelectOptions
          value={order}
          setValue={setOrder}
          options={orderOptions}
        />
      </PageSelectContainer>
      <ProductsContainer>
        {filteredPosts.map((item) => (
          <ProductsList
            key={item.id || item.isbn}
            title={item.title}
            image={item.image}
            thumbnail={item.thumbnail}
            price={item.price}
          />
        ))}
      </ProductsContainer>
      <footer>
        <Pagination
          total={posts?.length}
          limit={limit}
          page={page}
          setPage={setPage}
        />
      </footer>
    </ProductsWrapper>
  );
};

export default Posts;
