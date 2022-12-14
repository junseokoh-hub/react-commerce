import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { useMatch } from "react-router-dom";
import MainHeader from "../MainHeader/MainHeader";
import Footer from "./Footer";

const Html = styled.div`
  .navLine {
    display: block;
  }
  @media screen and (max-width: 480px) {
    .navLine {
      display: none;
    }
  }
`;

const Main = styled.main`
  padding-top: ${(props) => props.padding};
  min-height: 60vh;
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
    <Html>
      <MainHeader view={view} />
      <div className="navLine" ref={mainRef} />
      <Main padding={homeMatch ? "0" : "20vh"}>{children}</Main>
      <Footer />
    </Html>
  );
};

export default Layout;
