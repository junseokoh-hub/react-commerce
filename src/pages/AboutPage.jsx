import React, { useMemo } from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet-async";
import { useObserve } from "../hooks/useObserve";
import fabricImage from "../images/fabric.jpg";
import booksImage from "../images/books.jpg";
import jewelryImage from "../images/jewelry.jpg";

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

const AboutPhilosophy = styled.div`
  width: 40vw;
  position: absolute;
  right: 200px;
  bottom: 40%;
  color: ${(props) => props.theme.whiteColor};
  transition: all 1s ease-in-out;
  opacity: ${(props) => props.opacity};
  transform: ${(props) => props.transform};
  span {
    font-size: 70px;
    font-weight: bold;
  }
  p {
    margin-top: 50px;
    font-size: 50px;
  }
`;

const AboutPage = () => {
  const options = useMemo(() => {
    return {
      rootMargin: "-200px",
    };
  }, []);
  const { isView, targetRef: secondImageRef } = useObserve(options);

  return (
    <>
      <Helmet>
        <title>브랜드 스토리</title>
      </Helmet>
      <AboutContainer>
        <li id="brand_story">브랜드 스토리</li>
        <li>
          <img src={fabricImage} alt={"fabric"} />
        </li>
        <li ref={secondImageRef}>
          <img src={booksImage} alt={"books"} />
          <AboutPhilosophy
            opacity={isView ? 1 : 0}
            transform={!isView ? "translateX(100px)" : null}
          >
            <span>철학</span>
            <p>
              언제나 항상 최상의 품질과 최신의 물품들을 들여 놓아 고객분들께
              제공하겠습니다.
            </p>
          </AboutPhilosophy>
        </li>
        <li>
          <img src={jewelryImage} alt={"jewelry"} />
        </li>
      </AboutContainer>
    </>
  );
};

export default AboutPage;
