import React, { useCallback, useState } from "react";
import styled from "styled-components";
import Pagination from "../Pagination/Pagination";
import ProductsList from "../Products/ProductsList";

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

const Posts = ({ posts }) => {
  const [limit, setLimit] = useState(4);
  const [page, setPage] = useState(1);
  // const [order, setOrder] = useState("asc");

  const changeSelectOptions = useCallback((e) => {
    setLimit(e.target.value);
    setPage(1);
  }, []);

  // const changeOrderSelectOptions = useCallback((e) => {
  //   setOrder(e.target.value);
  // }, []);

  const offset = (page - 1) * limit;

  console.log("rendering");
  return (
    <ProductsWrapper>
      <PageSelectContainer>
        <PageSelect>
          <label>게시물 수:&nbsp;</label>
          <select type="number" value={limit} onChange={changeSelectOptions}>
            <option value="4">4</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </PageSelect>
        {/* <PageSelect>
          <label>차순:&nbsp;</label>
          <select type="text" value={order} onChange={changeOrderSelectOptions}>
            <option value="asc">오름차순</option>
            <option value="desc">내림차순</option>
          </select>
        </PageSelect> */}
      </PageSelectContainer>
      <ProductsContainer>
        {posts
          // ?.sort((a, b) => {
          //   if (order === "asc") {
          //     return a.title.charCodeAt(0) - b.title.charCodeAt(0);
          //   } else {
          //     return b.title.charCodeAt(0) - a.title.charCodeAt(0);
          //   }
          // })
          ?.slice(offset, offset + limit)
          .map(({ id, title, image, thumbnail, isbn }) => (
            <ProductsList
              key={id || isbn}
              title={title}
              image={image}
              thumbnail={thumbnail}
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
