import React, { useState, useCallback, useRef } from "react";
import styled from "styled-components";

const AccordionContainer = styled.section`
  margin: 0 auto;
  width: 50%;
  position: relative;
  border-radius: 4px;
  border: 1px solid silver;
`;

const AccordionHeader = styled.div`
  margin: 0 10px;
  height: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: ${(props) => props.border};
`;

const ToggleButton = styled.button`
  font-size: 14px;
`;

const ContentsWrapper = styled.article`
  height: 0;
  width: 100%;
  transition: height 0.35s ease;
  overflow-y: hidden;
`;

const Contents = styled.div`
  padding: 4px 8px;
`;

const Accordion = () => {
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

  return (
    <AccordionContainer>
      <AccordionHeader border={isClosed ? "1px solid rgba(0,0,0,0.25)" : null}>
        <p>아코디언</p>
        <ToggleButton onClick={toggleHandler}>{buttonText}</ToggleButton>
      </AccordionHeader>
      <ContentsWrapper ref={wrapperRef}>
        <Contents ref={contentRef}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil laborum
          quaerat quidem, mollitia, adipisci reprehenderit similique porro
          voluptatibus, deleniti facilis culpa ex dignissimos exercitationem
          temporibus iusto unde tenetur ad repellat.
        </Contents>
      </ContentsWrapper>
    </AccordionContainer>
  );
};

export default Accordion;
