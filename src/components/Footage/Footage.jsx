import React from "react";
import { useMatch } from "react-router-dom";
import styled from "styled-components";

const FooterWrapper = styled.footer`
  height: 300px;
  background-color: ${(props) => props.theme.brown.normal};
  /* display: ${(props) => props.display}; */
`;

const Footage = () => {
  const noMatch = useMatch("*");

  return (
    <FooterWrapper display={noMatch && "none"}>
      <ul>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </FooterWrapper>
  );
};

export default Footage;
