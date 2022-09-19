import React, { useRef, useState } from "react";
import styled from "styled-components";
import { Link, useMatch, useNavigate } from "react-router-dom";
import { useScroll } from "../../hooks/useScroll";
import { BsSearch, BsCart } from "react-icons/bs";
import { FiUser } from "react-icons/fi";
import { useRecoilState } from "recoil";
import { authAtom } from "../../store/authAtom";
import { searchBarAtom } from "../../store/searchBarAtom";
import NavSearchContainer from "../NavSearchContainer";

const Header = styled.header`
  height: ${(props) => props.height};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.bgColor};
  color: ${(props) => props.fontColor};
  transition: all 0.2s ease-in-out;
  z-index: 10;
  a {
    color: ${(props) => props.fontColor};
    transition: all 0.2s ease-in-out;
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
      &.glass {
        padding-right: 20px;
      }
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
  const [isSearchbar, setIsSearchBar] = useRecoilState(searchBarAtom);

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
    <>
      {isSearchbar ? (
        <NavSearchContainer />
      ) : (
        <Header
          ref={headerRef}
          height={homeMatch ? "30vh" : "20vh"}
          bgColor={
            navColorChange ? (props) => props.theme.whiteColor : "transparent"
          }
          fontColor={y > 50 ? (props) => props.theme.orange.lighter : "#000"}
        >
          <LinkContainer>
            <BsSearch
              className="glass"
              onClick={() => setIsSearchBar((prev) => !prev)}
            />
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
            <Link to="/products">Products</Link>
            <Link to="/review">Review</Link>
            <Link to="/community">Community</Link>
            <Link to="/about">About</Link>
          </LinkContainer>
        </Header>
      )}
    </>
  );
};

export default MainHeader;
