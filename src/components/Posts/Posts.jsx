import React, { useCallback, useState } from "react";
import styled from "styled-components";
import Pagination from "../Pagination/Pagination";
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
  grid-template-rows: repeat(2, 1fr);
  gap: 20px;
`;

const PageSelectContainer = styled.ul`
  margin: 30px 0;
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const PageSelect = styled.li`
  display: flex;
  align-items: center;
  & + & {
    margin-left: 20px;
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
    })
    ?.slice(offset, offset + limit);

  console.log("rendering");
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
        {filteredPosts.map(({ id, title, image, thumbnail, isbn, price }) => (
          <ProductsList
            key={id || isbn}
            title={title}
            image={image}
            thumbnail={thumbnail}
            price={price}
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
