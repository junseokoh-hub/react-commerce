import React from "react";
import styled from "styled-components";
import { NavLink, Outlet } from "react-router-dom";

const NotificationWrapper = styled.article`
  width: 100%;
`;

const NotificationNavContainer = styled.ul`
  margin: 10px 0;
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-bottom: 3px solid ${(props) => props.theme.brown.normal};
  li {
    a {
      font-size: 18px;
      font-weight: 700;
      color: ${(props) => props.theme.blackColor};
      &.clicked {
        color: ${(props) => props.theme.yellow.lighter};
      }
    }
  }
`;

const NotificationPage = () => {
  return (
    <NotificationWrapper>
      <NotificationNavContainer>
        <li>
          <NavLink
            to="notice"
            className={({ isActive }) => (isActive ? "clicked" : "")}
          >
            공지사항
          </NavLink>
        </li>
        <li>
          <NavLink
            to="event"
            className={({ isActive }) => (isActive ? "clicked" : "")}
          >
            이벤트
          </NavLink>
        </li>
      </NotificationNavContainer>
      <Outlet />
    </NotificationWrapper>
  );
};

export default NotificationPage;
