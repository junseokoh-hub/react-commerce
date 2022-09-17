import React from "react";
import styled from "styled-components";
import { useTitle } from "../hooks/useTitle";
import StyledSlider from "../utils/StyledSlider";
import perfume1 from "../images/perfume1.jpg";
import perfume2 from "../images/perfume2.jpg";
import perfume3 from "../images/perfume3.jpg";

const MainImgContainer = styled.div`
  width: 100%;
  height: 100vh;
  background: url(${(props) => props.bgphoto});
  background-position: center center;
  background-size: cover;
`;

const DUMMY_DATA = [
  {
    id: 1,
    image: perfume1,
  },
  {
    id: 2,
    image: perfume2,
  },
  {
    id: 3,
    image: perfume3,
  },
];

const Home = () => {
  useTitle("Home");

  return (
    <StyledSlider>
      {DUMMY_DATA.map((data) => (
        <MainImgContainer key={data.id} bgphoto={data.image} />
      ))}
    </StyledSlider>
  );
};

export default Home;
