import React from "react";
import styled from "styled-components";
import { useMatch } from "react-router-dom";
import MainHeader from "../MainHeader/MainHeader";
import Footage from "./Footage";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";

const Main = styled.main`
  padding-top: ${(props) => props.padding};
`;

const Layout = ({ children }) => {
  const [view, setView] = useState(false);

  const mainRef = useRef(null);

  const callback = (entries) => {
    const [entry] = entries;
    setView(entry.isIntersecting);
  };

  const options = {
    threshold: 0,
  };

  useEffect(() => {
    const io = new IntersectionObserver(callback, options);

    if (mainRef.current) {
      io.observe(mainRef.current);
    }

    return () => {
      if (mainRef.current) {
        io.unobserve(mainRef.current);
      }
    };
  }, [mainRef]);

  const homeMatch = useMatch("/");

  return (
    <>
      <MainHeader view={view} />
      <div ref={mainRef} />
      <Main padding={homeMatch ? "0" : "20vh"}>{children}</Main>
      <Footage />
    </>
  );
};

export default Layout;
