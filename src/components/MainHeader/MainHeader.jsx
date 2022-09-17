import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Header = styled.header`
  height: 30vh;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.bgColor};
  transition: 0.2s ease-in-out;
`;

const LinkContainer = styled.nav`
  padding-right: 20px;
  display: flex;
  justify-content: end;
  align-items: center;
  &:nth-of-type(1) {
    height: 20%;
  }
  &:nth-of-type(2) {
    flex-grow: 1;
    font-size: 40px;
    font-weight: bold;
  }
  a {
    padding: 20px;
    color: ${(props) => props.theme.blackColor};
  }
`;

const MainHeader = () => {
  const [navColorChange, setNavColorChange] = useState(false);

  const mouseOnNav = () => {
    setNavColorChange(true);
  };

  const mouseOutNav = () => {
    setNavColorChange(false);
  };

  return (
    <Header
      bgColor={
        navColorChange ? (props) => props.theme.whiteColor : "transparent"
      }
    >
      <LinkContainer>
        <Link to="/search">Search</Link>
        <Link to="/myCart">My Cart</Link>
        <Link to="/myPage">My Page</Link>
      </LinkContainer>
      <LinkContainer onMouseEnter={mouseOnNav} onMouseLeave={mouseOutNav}>
        <Link to="/">Home</Link>
        <Link to="/new">New</Link>
        <Link to="/popular">Popular</Link>
        <Link to="/review">Review</Link>
        <Link to="/community">Community</Link>
        <Link to="/about">About</Link>
      </LinkContainer>
    </Header>
  );
};

export default MainHeader;
