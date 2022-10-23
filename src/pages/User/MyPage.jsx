import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet-async";
import { Link, NavLink, Outlet } from "react-router-dom";
import { useLogout } from "../../hooks/useLogout";
import { BiLogOut } from "react-icons/bi";

const MyPageWrapper = styled.section`
  display: flex;
  @media screen and (max-width: 480px) {
    display: block;
  }
`;

const MyPageSideNav = styled.nav`
  min-width: 200px;
  height: 300px;
  border-top: 5px solid ${(props) => props.theme.orange.lighter};
  @media screen and (max-width: 768px) {
    min-width: 150px;
  }
  @media screen and (max-width: 480px) {
    height: 70px;
    border: none;
  }
`;

const MyPageNavList = styled.ul`
  @media screen and (max-width: 480px) {
    display: flex;
  }
`;

const MyPageNavLinks = styled.li`
  margin: 15px 0;
  width: 100%;
  text-align: center;
  font-weight: bolder;
  font-size: 20px;
  &:nth-of-type(3) {
    position: relative;
    .logout_btn {
      position: absolute;
      left: 20px;
    }
  }
  a {
    color: ${(props) => props.theme.orange.normal};
    &.clicked {
      color: ${(props) => props.theme.brown.normal};
    }
  }
  @media screen and (max-width: 768px) {
    &:nth-of-type(3) {
      .logout_btn {
        left: 5px;
      }
    }
  }
  @media screen and (max-width: 480px) {
    &:nth-of-type(3) {
      .logout_btn {
        left: 10px;
      }
    }
  }
`;

const MyPage = () => {
  const { error, logout } = useLogout();

  return (
    <>
      <Helmet>
        <title>내 정보</title>
      </Helmet>
      <MyPageWrapper>
        <MyPageSideNav>
          <MyPageNavList>
            <MyPageNavLinks>
              <NavLink
                to="myProfile"
                className={({ isActive }) => (isActive ? "clicked" : null)}
              >
                내 정보
              </NavLink>
            </MyPageNavLinks>
            <MyPageNavLinks>
              <NavLink
                to="myList"
                className={({ isActive }) => (isActive ? "clicked" : null)}
              >
                내 목록
              </NavLink>
            </MyPageNavLinks>
            <MyPageNavLinks>
              <BiLogOut className="logout_btn" />
              <Link to="/" onClick={!error && logout}>
                로그아웃
              </Link>
            </MyPageNavLinks>
          </MyPageNavList>
        </MyPageSideNav>
        <Outlet />
      </MyPageWrapper>
    </>
  );
};

export default MyPage;
