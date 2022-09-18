import React, { useState } from "react";
import styled from "styled-components";
import { useQuery } from "react-query";
import { fetchProducts } from "../../lib/api";
import Pagination from "../Pagination/Pagination";

const ProductsWrapper = styled.section`
  margin: 0 auto;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProductsContainer = styled.section`
  margin-top: 100px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
`;

const Posts = () => {
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

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>{error.toString()}</div>;

  console.log("I'm rendered");

  return (
    <ProductsWrapper>
      <label>
        페이지 당 표시할 게시물 수:&nbsp;
        <select
          type="number"
          value={limit}
          onChange={({ target: { value } }) => setLimit(Number(value))}
        >
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="15">15</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
      </label>

      <ProductsContainer>
        {data.slice(offset, offset + limit).map(({ id, title, image }) => (
          <article key={id}>
            <img
              style={{
                width: "100px",
                height: "100px",
                display: "block",
                margin: "0 auto",
              }}
              src={image}
              alt={title}
            />
            <h3 style={{ textAlign: "center" }}>{title}</h3>
          </article>
        ))}
      </ProductsContainer>

      <footer>
        <Pagination
          total={data.length}
          limit={limit}
          page={page}
          setPage={setPage}
        />
      </footer>
    </ProductsWrapper>
  );
};

export default Posts;
