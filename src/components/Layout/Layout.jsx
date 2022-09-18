import React from "react";
import styled from "styled-components";
import { useMatch } from "react-router-dom";
import MainHeader from "../MainHeader/MainHeader";
import Footage from "../Footage/Footage";

const Main = styled.main`
  padding-top: ${(props) => props.padding};
`;

const Layout = ({ children }) => {
  const homeMatch = useMatch("/");

  return (
    <>
      <MainHeader />
      <Main padding={homeMatch ? "" : "20vh"}>{children}</Main>
      <Footage />
    </>
  );
};

export default Layout;
