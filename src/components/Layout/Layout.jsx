import React from "react";
import styled from "styled-components";
import { useMatch } from "react-router-dom";
import MainHeader from "../MainHeader/MainHeader";

const Main = styled.main`
  padding-top: ${(props) => props.padding};
`;

const Layout = ({ children }) => {
  const homeMatch = useMatch("/");

  return (
    <>
      <MainHeader />
      <Main padding={homeMatch ? "30vh" : "20vh"}>{children}</Main>
      {/* <footer>Hello</footer> */}
    </>
  );
};

export default Layout;
