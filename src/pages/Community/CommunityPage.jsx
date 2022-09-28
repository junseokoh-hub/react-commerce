import React from "react";
import styled from "styled-components";
import { NavLink, Outlet } from "react-router-dom";

const CommunitySection = styled.section`
  display: flex;
`;

const CommunityNav = styled.aside`
  min-width: 200px;
  height: 300px;
  border-top: 5px solid ${(props) => props.theme.orange.lighter};
  h3 {
    margin-top: 15px;
    font-size: 35px;
    font-weight: bold;
    color: rgba(0, 0, 0, 0.8);
    text-align: center;
  }
`;

const CommunityNavIndex = styled.ul`
  li {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }
  a {
    display: flex;
    color: ${(props) => props.theme.orange.lighter};
    font-weight: 600;
    &.clicked {
      color: ${(props) => props.theme.brown.normal};
    }
  }
`;

const CommunityPage = () => {
  return (
    <CommunitySection>
      <CommunityNav>
        <h3>커뮤니티</h3>
        <CommunityNavIndex>
          <li>
            <NavLink
              to="review"
              className={({ isActive }) => (isActive ? "clicked" : null)}
            >
              Review
            </NavLink>
          </li>
          <li>
            <NavLink
              to="notice"
              className={({ isActive }) => (isActive ? "clicked" : null)}
            >
              Notice
            </NavLink>
          </li>

          <li>
            <NavLink
              to="faq"
              className={({ isActive }) => (isActive ? "clicked" : null)}
            >
              FAQ
            </NavLink>
          </li>
        </CommunityNavIndex>
      </CommunityNav>
      <Outlet />
    </CommunitySection>
  );
};

export default CommunityPage;
