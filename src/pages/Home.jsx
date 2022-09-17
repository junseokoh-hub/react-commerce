import React from "react";
import styled from "styled-components";
import { useTitle } from "../hooks/useTitle";
import perfumeImg from "../images/perfume1.jpg";

const MainImg = styled.img`
  width: 100%;
  height: 90vh;
`;

const Home = () => {
  useTitle("Home");

  return <MainImg src={perfumeImg} alt="Perfume!!" />;
};

export default Home;
