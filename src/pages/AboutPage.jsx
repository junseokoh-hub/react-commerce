import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet-async";
import fabricImage from "../images/fabric.jpg";
import booksImage from "../images/books.jpg";
import jewelryImage from "../images/jewelry.jpg";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { useMemo } from "react";
import { useCallback } from "react";

const DUMMY_DATA = [
  {
    id: 1,
    image: fabricImage,
    content: "fabric",
  },
  {
    id: 2,
    image: booksImage,
    content: "books",
  },
  {
    id: 3,
    image: jewelryImage,
    content: "jewelry",
  },
];

const AboutContainer = styled.ul`
  li {
    &:not(#brand_story) {
      min-height: 80vh;
    }
    &:nth-of-type(1) {
      height: 20vh;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: ${(props) => props.theme.yellow.lighter};
      color: #2c3a47;
      font-size: 28px;
      font-weight: bolder;
    }
    &:nth-of-type(3) {
      position: relative;
    }
  }
  img {
    display: block;
    width: 100%;
  }
`;

const AboutPhilosophy = styled.p`
  position: absolute;
  right: 10px;
  bottom: 50%;
  font-size: 100px;
  color: ${(props) => props.theme.whiteColor};
  transition: all 1s ease-in-out;
  opacity: ${(props) => props.opacity};
  transform: ${(props) => props.transform};
`;

const AboutPage = () => {
  const [isView, setIsView] = useState(false);
  const secondImageRef = useRef(null);

  const options = useMemo(() => {
    return {
      rootMargin: "-200px",
    };
  }, []);

  const callback = useCallback(([entry], observer) => {
    if (entry.isIntersecting) {
      observer.unobserve(secondImageRef.current);
      setIsView(true);
    }
  }, []);

  useEffect(() => {
    if (!secondImageRef.current) return;
    const io = new IntersectionObserver(callback, options);

    if (secondImageRef.current) {
      io.observe(secondImageRef.current);
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>브랜드 스토리</title>
      </Helmet>
      <AboutContainer>
        <li id="brand_story">브랜드 스토리</li>
        <li>
          <img src={DUMMY_DATA[0].image} alt={DUMMY_DATA[0].content} />
        </li>
        <li ref={secondImageRef}>
          <img src={DUMMY_DATA[1].image} alt={DUMMY_DATA[1].content} />
          <AboutPhilosophy
            opacity={isView ? 1 : 0}
            transform={isView ? "translateY(-100px)" : null}
          >
            철학
          </AboutPhilosophy>
        </li>
        <li>
          <img src={DUMMY_DATA[2].image} alt={DUMMY_DATA[2].content} />
        </li>
      </AboutContainer>
    </>
  );
};

export default AboutPage;
