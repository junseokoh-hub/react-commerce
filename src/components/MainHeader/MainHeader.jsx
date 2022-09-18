import React, { useRef, useState } from "react";
import styled from "styled-components";
import { Link, useMatch, useNavigate } from "react-router-dom";
import { useScroll } from "../../hooks/useScroll";
import { BsSearch, BsCart } from "react-icons/bs";
import { FiUser } from "react-icons/fi";
import { useRecoilState } from "recoil";
import { authAtom } from "../../store/authAtom";

const Header = styled.header`
  height: ${(props) => props.height};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.bgColor};
  transition: all 0.2s ease-in-out;
  z-index: 10;
  nav {
    a {
      color: ${(props) => props.color};
      transition: all 0.3s ease-in-out;
    }
  }
`;

const LinkContainer = styled.nav`
  padding-right: 20px;
  display: flex;
  justify-content: end;
  align-items: center;
  &:nth-of-type(1) {
    height: 40%;
    svg {
      font-size: 30px;
    }
  }
  &:nth-of-type(2) {
    flex-grow: 1;
    font-size: 30px;
    font-weight: bold;
  }
  a {
    padding: 20px;
  }
`;

const MainHeader = () => {
  const [navColorChange, setNavColorChange] = useState(false);
  const [isAuth, setIsAuth] = useRecoilState(authAtom);
  const navigate = useNavigate("/");
  const headerRef = useRef();

  const homeMatch = useMatch("/");

  const { y } = useScroll();

  const mouseOnNav = () => {
    setNavColorChange(true);
  };

  const mouseOutNav = () => {
    setNavColorChange(false);
  };

  const logoutHandler = () => {
    localStorage.removeItem("id");
    setIsAuth(localStorage.getItem("id") !== null);
    if (!isAuth) {
      navigate("/");
    }
  };

  return (
    <Header
      ref={headerRef}
      height={homeMatch ? "30vh" : "20vh"}
      bgColor={
        navColorChange ? (props) => props.theme.whiteColor : "transparent"
      }
      color={y > 50 ? "teal" : "#000"}
    >
      <LinkContainer>
        <Link to="/search">
          <BsSearch />
        </Link>
        <Link to="/myCart">
          <BsCart />
        </Link>
        <Link to="/myPage">
          <FiUser />
        </Link>
        {isAuth && (
          <span style={{ cursor: "pointer" }} onClick={logoutHandler}>
            Log Out
          </span>
        )}
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
