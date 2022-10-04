import React, { useCallback, useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useMatch, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { BsSearch, BsCart } from "react-icons/bs";
import { FiUser } from "react-icons/fi";
import { AiOutlineMenu } from "react-icons/ai";
import { authUserAtom } from "../../store/authAtom";
import { searchBarAtom } from "../../store/searchBarAtom";
import { useLogout } from "../../hooks/useLogout";
import Modal from "../../lib/Modal";
import NavSearchContainer from "./NavSearchContainer";

const Header = styled.header`
  height: ${(props) => props.height};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.bgColor};
  color: ${(props) => props.fontcolor};
  transition: all 0.2s ease-in-out;
  z-index: 1000;
  a {
    color: ${(props) => props.fontcolor};
    transition: all 0.2s ease-in-out;
  }
  @media screen and (max-width: 480px) {
    height: ${(props) => props.mobileHeight};
    color: ${(props) => props.theme.blackColor};
    a {
      color: ${(props) => props.theme.blackColor};
    }
  }
`;

const LinkContainer = styled.nav`
  padding-right: 20px;
  display: flex;
  justify-content: end;
  align-items: center;
  &:nth-of-type(1) {
    height: 30%;
    svg {
      cursor: pointer;
      font-size: 30px;
      &.glass {
        margin-right: 20px;
      }
      &.menu {
        display: none;
      }
    }
    span {
      cursor: pointer;
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

  @media screen and (max-width: 768px) {
    &:nth-of-type(2) {
      font-size: 20px;
    }
    a {
      padding: 10px;
    }
  }
  @media screen and (max-width: 480px) {
    &:nth-of-type(1) {
      padding: 0 20px;
      height: 6vh;
      justify-content: space-between;
      background-color: ${(props) => props.mobileBgColor};
      a,
      span {
        display: none;
      }
      svg {
        &.glass {
          margin: 0;
        }
        &.menu {
          display: flex;
        }
      }
    }
    &:nth-of-type(2) {
      padding: 0;
      display: ${(props) => props.display};
      flex-direction: column;
      background-color: ${(props) => props.mobileBgColor};
      a {
        padding: 0;
        height: 100%;
        display: flex;
        align-items: center;
      }
    }
  }
`;

const MainHeader = ({ view }) => {
  const [navColorChange, setNavColorChange] = useState(false);
  const authUser = useRecoilValue(authUserAtom);
  const [isSearchbar, setIsSearchBar] = useRecoilState(searchBarAtom);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { logout } = useLogout();

  const navigate = useNavigate();

  const homeMatch = useMatch("/");

  const mouseOnNav = useCallback(() => {
    setNavColorChange(true);
  }, []);

  const mouseOutNav = useCallback(() => {
    setNavColorChange(false);
  }, []);

  const logoutHandler = useCallback(() => {
    logout();
    navigate("/");
  }, []);

  const closeModalHandler = useCallback(() => {
    setIsSearchBar(false);
  }, []);

  const toggleMenuHandler = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    const links = document.querySelectorAll("a");
    links.forEach((link) => {
      link.addEventListener("click", () => {
        setIsMenuOpen(false);
      });
    });
  }, []);

  return (
    <>
      {isSearchbar && (
        <Modal closeModal={closeModalHandler}>
          <NavSearchContainer />
        </Modal>
      )}

      <Header
        height={homeMatch ? "30vh" : "20vh"}
        mobileHeight={isMenuOpen ? "30vh" : "20vh"}
        bgColor={
          navColorChange ? (props) => props.theme.whiteColor : "transparent"
        }
        fontcolor={
          view
            ? (props) => props.theme.blackColor
            : (props) => props.theme.orange.lighter
        }
      >
        <LinkContainer
          mobileBgColor={isMenuOpen ? (props) => props.theme.whiteColor : null}
        >
          <AiOutlineMenu className="menu" onClick={toggleMenuHandler} />
          <BsSearch
            className="glass"
            onClick={() => {
              setIsSearchBar((prev) => !prev);
              setIsMenuOpen(false);
            }}
          />
          <Link to="/myCart">
            <BsCart />
          </Link>
          {!authUser.user && (
            <Link to="/login">
              <FiUser />
            </Link>
          )}
          {authUser.user && (
            <span style={{ margin: "0 10px", cursor: "default" }}>
              {authUser.user.displayName}님 환영합니다!
            </span>
          )}
          {authUser.user && <span onClick={logoutHandler}>Log Out</span>}
        </LinkContainer>
        <LinkContainer
          mobileBgColor={isMenuOpen ? (props) => props.theme.whiteColor : null}
          display={isMenuOpen ? "flex" : "none"}
          onMouseEnter={mouseOnNav}
          onMouseLeave={mouseOutNav}
        >
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/community/review">Community</Link>
          <Link to="/about">About</Link>
        </LinkContainer>
      </Header>
    </>
  );
};

export default MainHeader;
