import React from "react";
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
    background: ${(props) => props.theme.blackColor};
    color: ${(props) => props.theme.whiteColor};
    border: none;
    transform: revert;
  }

  &[aria-current] {
    background: ${(props) => props.theme.orange.lighter};
    font-weight: bold;
    cursor: revert;
    transform: revert;
  }
`;

function Pagination({ total, limit, page, setPage }) {
  const numPages = Math.ceil(total / limit);

  return (
    <>
      <Nav>
        <Button onClick={() => setPage(page - 1)} disabled={page === 1}>
          &lt;
        </Button>
        {Array(numPages)
          .fill()
          .map((_, i) => (
            <Button
              key={i + 1}
              onClick={() => setPage(i + 1)}
              aria-current={page === i + 1 ? "page" : null}
            >
              {i + 1}
            </Button>
          ))}
        <Button onClick={() => setPage(page + 1)} disabled={page === numPages}>
          &gt;
        </Button>
      </Nav>
    </>
  );
}

export default Pagination;
