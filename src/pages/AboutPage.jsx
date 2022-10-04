import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet-async";
import { useObserve } from "../hooks/useObserve";
import fabricImage from "../images/fabric.jpg";
import booksImage from "../images/books.jpg";
import jewelryImage from "../images/jewelry.jpg";
import monitorImage from "../images/monitor.jpg";

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
    &:nth-of-type(4) {
      position: relative;
      background-color: #d7d6db;
    }
    &:nth-of-type(5) {
      position: relative;
    }
  }
  img {
    display: block;
    width: 100%;
    height: 100vh;
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
    font-size: 40px;
    line-height: 1.3;
  }
  @media screen and (max-width: 1000px) {
    right: 50px;
    span {
      font-size: 40px;
    }
    p {
      font-size: 20px;
    }
  }
  @media screen and (max-width: 480px) {
    width: 50vw;
    p {
      line-height: 1.5;
    }
  }
`;

const SuperiorProduct = styled.div`
  width: 40vw;
  position: absolute;
  top: 20%;
  left: 30%;
  text-align: center;
  color: ${(props) => props.theme.blackColor};
  transition: all 1s ease-in-out;
  opacity: ${(props) => props.opacity};
  transform: ${(props) => props.transform};
  h3 {
    font-size: 40px;
    font-weight: 500;
  }
  p {
    margin-top: 50px;
    font-size: 25px;
    line-height: 1.5;
  }
  @media screen and (max-width: 768px) {
    width: 50vw;
    left: 28%;
    p {
      font-size: 20px;
    }
  }
  @media screen and (max-width: 480px) {
    width: 60vw;
    left: 20%;
  }
`;

const LastComment = styled.div`
  position: absolute;
  top: 30%;
  left: 33%;
  text-align: center;
  transition: all 1s ease-in-out;
  opacity: ${(props) => props.opacity};
  transform: ${(props) => props.transform};
  h3 {
    font-weight: bold;
    font-size: 40px;
    &:nth-of-type(2) {
      margin-top: 20px;
    }
  }
  p {
    font-size: 18px;
    font-weight: 600;
    line-height: 1.6;
  }
  @media screen and (max-width: 1000px) {
    left: 32%;
    h3 {
      font-size: 30px;
    }

    p {
      font-size: 12px;
    }
  }

  @media screen and (max-width: 768px) {
    left: 27%;
    top: 10px;
  }

  @media screen and (max-width: 480px) {
    left: 15%;
  }
`;

const AboutPage = () => {
  const { isView, targetRef: secondImageRef } = useObserve({ threshold: 0.3 });
  const { isView: isNextView, targetRef: thirdImageRef } = useObserve({
    rootMargin: "100px",
  });
  const { isView: isLastView, targetRef: fourthImageRef } = useObserve({
    threshold: 0.5,
  });

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
            transform={!isView ? "translateX(50px)" : null}
          >
            <span>철학</span>
            <p>
              전세계 각지에서 수입해오는 최상급의 제료를 이용해 언제나 항상
              최상의 품질과 최신의 물품들을 들여 놓아 고객분들께 제공하겠습니다.
            </p>
          </AboutPhilosophy>
        </li>
        <li ref={thirdImageRef}>
          <img
            style={{
              transition: "all .5s ease-in-out",
              opacity: isNextView ? 1 : 0,
              transform: !isNextView ? "translateY(100px)" : null,
            }}
            src={jewelryImage}
            alt={"jewelry"}
          />
          <SuperiorProduct
            opacity={isNextView ? 1 : 0}
            transform={!isNextView ? "translateY(100px)" : null}
          >
            <h3>최상의 물품</h3>
            <p>
              1,2년만 입을 수 있는 옷, 혹은 해어지는 책이 아닌 10년이 지나도
              멀쩡하게 입을 수 있으며 깔끔한 책을 여러분께 드리기 위하는 마음이
              담겨있습니다.
            </p>
          </SuperiorProduct>
        </li>
        <li ref={fourthImageRef}>
          <img src={monitorImage} alt="monitor" />
          <LastComment
            transform={!isLastView ? "translateY(100px)" : null}
            opacity={isLastView ? 1 : 0}
          >
            <h3>"</h3>
            <p>
              이러한 저희의 철학이 저희만의 퀄리티를 탄생시킵니다.
              <br />
              끊임없이 발전하고 움직이는 저희 회사.
              <br />
              여러분께 언제나 항상 최고만을 선사드리도록 노력하겠습니다.
            </p>
            <h3>"</h3>
          </LastComment>
        </li>
      </AboutContainer>
    </>
  );
};

export default AboutPage;
