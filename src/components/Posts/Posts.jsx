import React, { useCallback, useState } from "react";
import styled from "styled-components";
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

const PageSelectArticle = styled.article`
  display: flex;
  align-items: center;
`;

const IndivProductArticle = styled.article`
  img {
    margin: 0 auto;
    width: 200px;
    height: 200px;
    display: flex;
  }
`;

const Posts = ({ posts }) => {
  const [limit, setLimit] = useState(4);
  const [page, setPage] = useState(1);

  const changeSelectOptions = useCallback((e) => {
    setLimit(e.target.value);
    setPage(1);
  }, []);

  const offset = (page - 1) * limit;

  return (
    <ProductsWrapper>
      <PageSelectArticle>
        <label>페이지 당 표시할 게시물 수:&nbsp;</label>
        <select type="number" value={limit} onChange={changeSelectOptions}>
          <option value="4">4</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </PageSelectArticle>
      <ProductsContainer>
        {posts
          ?.slice(offset, offset + limit)
          .map(({ id, title, image, thumbnail, isbn }) => (
            <IndivProductArticle key={id || isbn}>
              <img src={image || thumbnail} alt={title} />
              <h3 style={{ textAlign: "center" }}>{title}</h3>
            </IndivProductArticle>
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
