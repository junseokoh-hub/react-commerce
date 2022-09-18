import React from "react";
import styled from "styled-components";

const FooterWrapper = styled.footer`
  background-color: ${(props) => props.theme.brown.normal};
`;

const Footage = () => {
  return <FooterWrapper>Hello</FooterWrapper>;
};

export default Footage;
