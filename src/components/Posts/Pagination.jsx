import React, { useEffect } from "react";
import styled from "styled-components";

const Nav = styled.nav`
  margin: 16px;
  display: flex;
  gap: 4px;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  margin: 0;
  padding: 8px;
  border: 1px solid ${(props) => props.theme.orange.lighter};
  border-radius: 8px;
  font-size: 1rem;
  background-color: transparent;
  color: ${(props) => props.theme.blackColor};

  &:hover {
    background: tomato;
    cursor: pointer;
    transform: translateY(-2px);
  }

  &[disabled] {
    background: ${(props) => props.theme.brown.normal};
    color: ${(props) => props.theme.whiteColor};
    border: none;
    transform: revert;
  }

  &[aria-current] {
    background: ${(props) => props.theme.orange.lighter};
    color: ${(props) => props.theme.whiteColor};
    font-weight: bold;
    cursor: revert;
    transform: revert;
  }
`;

function Pagination({ total, limit, page, setPage }) {
  const numPages = Math.ceil(total / limit);

  useEffect(() => {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }, [page]);

  return (
    <>
      <Nav>
        <Button onClick={() => setPage(page - 1)} disabled={page === 1}>
          &lt;
        </Button>
        {Array(numPages)
          .fill()
          .map((_, index) => (
            <Button
              key={index + 1}
              onClick={() => setPage(index + 1)}
              aria-current={page === index + 1 ? "page" : null}
            >
              {index + 1}
            </Button>
          ))}
        <Button onClick={() => setPage(page + 1)} disabled={page === numPages}>
          &gt;
        </Button>
      </Nav>
    </>
  );
}

export default React.memo(Pagination);
