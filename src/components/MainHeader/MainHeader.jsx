import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { Link, useMatch, useNavigate } from "react-router-dom";
import { BsSearch, BsCart } from "react-icons/bs";
import { FiUser } from "react-icons/fi";
import { useRecoilState, useRecoilValue } from "recoil";
import { authUserAtom } from "../../store/authAtom";
import { searchBarAtom } from "../../store/searchBarAtom";
import NavSearchContainer from "./NavSearchContainer";
import Modal from "../../lib/Modal";
import { useLogout } from "../../hooks/useLogout";

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
  z-index: 100000;
  a {
    color: ${(props) => props.fontcolor};
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
        margin-right: 20px;
      }
      cursor: pointer;
      font-size: 30px;
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
`;

const MainHeader = ({ view }) => {
  const [navColorChange, setNavColorChange] = useState(false);
  const authUser = useRecoilValue(authUserAtom);
  const [isSearchbar, setIsSearchBar] = useRecoilState(searchBarAtom);

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

  return (
    <>
      {isSearchbar ? (
        <Modal closeModal={closeModalHandler}>
          <NavSearchContainer />
        </Modal>
      ) : (
        <Header
          height={homeMatch ? "30vh" : "20vh"}
          bgColor={
            navColorChange ? (props) => props.theme.whiteColor : "transparent"
          }
          fontcolor={
            view
              ? (props) => props.theme.blackColor
              : (props) => props.theme.orange.lighter
          }
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
            {authUser.user && <span onClick={logoutHandler}>Log Out</span>}
          </LinkContainer>
          <LinkContainer onMouseEnter={mouseOnNav} onMouseLeave={mouseOutNav}>
            <Link to="/">Home</Link>
            <Link to="/products">Products</Link>
            <Link to="/community/review">Community</Link>
            <Link to="/about">About</Link>
          </LinkContainer>
        </Header>
      )}
    </>
  );
};

export default MainHeader;
