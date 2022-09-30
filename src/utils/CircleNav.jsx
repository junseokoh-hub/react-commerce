import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const CircleMain = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: none;
  /* background-color: ${(props) => props.theme.orange.normal}; */
  background-color: black;
  @media screen and (max-width: 480px) {
    display: flex;
    position: absolute;
    left: 10px;
    bottom: 0;
  }
`;

const CircleOutlet = styled(Link)`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  position: absolute;
  background-color: aliceblue;
  display: ${(props) => props.display};
  justify-content: center;
  align-items: center;
  &:nth-of-type(1) {
    transition: all 0.2s ease;
    opacity: ${(props) => props.opacity};
    transform: ${(props) => props.transform};
  }
  &:nth-of-type(2) {
    transition: all 0.4s ease;
    opacity: ${(props) => props.opacity};
    transform: ${(props) => props.transform};
  }
  &:nth-of-type(3) {
    transition: all 0.6s ease;
    opacity: ${(props) => props.opacity};
    transform: ${(props) => props.transform};
  }
`;

const CircleNav = () => {
  const [clicked, setClicked] = useState(false);

  return (
    <CircleMain onClick={() => setClicked((prev) => !prev)}>
      <CircleOutlet
        transform={clicked ? "translate(60px, -60px)" : ""}
        to="/community/review"
      />
      <CircleOutlet
        transform={clicked ? "translateX(60px)" : ""}
        to="/community/notice"
      />
      <CircleOutlet
        transform={clicked ? "translate(60px, 60px)" : ""}
        to="faq"
      />
    </CircleMain>
  );
};

export default CircleNav;
