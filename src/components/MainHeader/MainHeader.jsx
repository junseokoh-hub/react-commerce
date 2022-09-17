import React from "react";
import styled from "styled-components";

const Header = styled.header`
  height: 20vh;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background-color: ${(props) => props.theme.whiteColor};
`;

const LinkContainer = styled.nav`
  display: flex;
  justify-content: end;
`;

const MainHeader = () => {
  return (
    <Header>
      <LinkContainer>
        <span>Search</span>
        <span>My Cart</span>
        <span>My Page</span>
      </LinkContainer>
      <LinkContainer>
        <span>New</span>
        <span>Popular</span>
        <span>Review</span>
        <span>Community</span>
        <span>About</span>
      </LinkContainer>
    </Header>
  );
};

export default MainHeader;
