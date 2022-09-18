import React from "react";
import styled from "styled-components";

const FooterWrapper = styled.footer`
  height: 300px;
  background-color: ${(props) => props.theme.brown.normal};
`;

const Footage = () => {
  return (
    <FooterWrapper>
      <ul>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </FooterWrapper>
  );
};

export default Footage;
