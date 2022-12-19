import React, { useState, useCallback, useRef } from "react";
import styled from "styled-components";

const AccordionContainer = styled.section`
  margin: 0 auto;
  width: 60%;
  position: relative;
  border-radius: 4px;
  border: 1px solid #fad390;
  background-color: ${(props) => props.theme.orange.lighter};
  color: ${(props) => props.theme.whiteColor};
  @media screen and (max-width: 768px) {
    width: 95%;
  }
  @media screen and (max-width: 480px) {
    width: 100%;
  }
`;

const AccordionHeader = styled.div`
  padding: 10px 0;
  margin: 0 10px;
  height: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: ${(props) => props.border};
  @media screen and (max-width: 600px) {
    height: 60px;
  }
`;

const AccordionTitle = styled.p`
  font-weight: bold;
  @media screen and (max-width: 768px) {
    font-size: 14px;
  }
  @media screen and (max-width: 480px) {
    font-size: 8px;
  }
`;

const ToggleButton = styled.button`
  width: 80px;
  height: 30px;
  border-radius: 5px;
  border: 1px solid ${(props) => props.theme.orange.normal};
  background-color: transparent;
  color: ${(props) => props.theme.whiteColor};
  transition: all 0.1s ease-in-out;
  &:hover {
    background-color: ${(props) => props.theme.orange.normal};
  }
  &[aria-current] {
    background-color: ${(props) => props.theme.orange.normal};
  }
  @media screen and (max-width: 768px) {
    width: 50px;
  }
  @media screen and (max-width: 480px) {
    font-size: 10px;
  }
`;

const ContentsWrapper = styled.article`
  height: 0;
  width: 100%;
  transition: height 0.35s ease;
  overflow-y: hidden;
`;

const Contents = styled.div`
  padding: 20px 8px;
  line-height: 1.5;
`;

const Accordion = ({ data }) => {
  const [isClosed, setIsClosed] = useState(false);

  const wrapperRef = useRef(null);
  const contentRef = useRef(null);

  const toggleHandler = useCallback(() => {
    if (wrapperRef.current === null || contentRef.current === null) {
      return;
    }
    if (wrapperRef.current.clientHeight > 0) {
      wrapperRef.current.style.height = "0";
    } else {
      wrapperRef.current.style.height = `${contentRef.current.clientHeight}px`;
    }
    setIsClosed(!isClosed);
  }, [isClosed]);

  const wrapperRefHeight = wrapperRef.current?.style.height ?? "0px";
  const buttonText = wrapperRefHeight === "0px" ? "열기" : "닫기";

  const { title, content } = data;

  return (
    <AccordionContainer>
      <AccordionHeader border={isClosed ? "1px solid rgba(0,0,0,0.25)" : null}>
        <AccordionTitle>{title}</AccordionTitle>
        <ToggleButton
          aria-current={isClosed ? "page" : null}
          onClick={toggleHandler}
        >
          {buttonText}
        </ToggleButton>
      </AccordionHeader>
      <ContentsWrapper ref={wrapperRef}>
        <Contents ref={contentRef}>{content}</Contents>
      </ContentsWrapper>
    </AccordionContainer>
  );
};

export default Accordion;
