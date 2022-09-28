import React from "react";
import styled from "styled-components";
import FooterInfo from "../Footer/FooterInfo";
import FooterLinks from "../Footer/FooterLinks";

const FooterWrapper = styled.footer`
  width: 100%;
  padding: 40px 100px;
  height: 300px;
  background-color: ${(props) => props.theme.brown.normal};
  @media screen and (max-width: 1000px) {
    padding: 40px 20px;
  }
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <FooterLinks />
      <FooterInfo />
    </FooterWrapper>
  );
};

export default Footer;
