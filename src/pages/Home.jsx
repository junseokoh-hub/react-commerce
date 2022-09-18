import React from "react";
import styled from "styled-components";
import { useTitle } from "../hooks/useTitle";
import StyledSlider from "../utils/StyledSlider";
import perfume1 from "../images/perfume1.jpg";
import perfume2 from "../images/perfume2.jpg";
import perfume3 from "../images/perfume3.jpg";
import { useQuery } from "react-query";

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

const MainImgContainer = styled.div`
  width: 100%;
  height: 100vh;
  background: url(${(props) => props.bgphoto});
  background-position: center center;
  background-size: cover;
`;

const LiningImgContainer = styled.div`
  margin-top: 20px;
  height: 60vh;
  background: url(${(props) => props.bgphoto});
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
`;

const Home = () => {
  useTitle("Home");
  const { isLoading, data, isError, error } = useQuery(
    ["home", "products"],
    async () => {
      const response = await fetch("https://fakestoreapi.com/products");
      if (!response.ok) {
        throw new Error("Something went wrong while fetching");
      }
      const json = await response.json();
      return json;
    },
  );

  if (isError) return <div>{error.message}</div>;

  const menClothesData =
    data && data.filter((item) => item.category === "men's clothing");

  return (
    <>
      <StyledSlider>
        {DUMMY_DATA.map((data) => (
          <MainImgContainer key={data.id} bgphoto={data.image} />
        ))}
      </StyledSlider>
      <StyledSlider>
        {isLoading && <div>Loading...</div>}
        {!isLoading &&
          menClothesData &&
          menClothesData.map((item) => (
            <LiningImgContainer
              bgphoto={item.image}
              key={item.id + item.description}
            />
          ))}
      </StyledSlider>
    </>
  );
};

export default Home;
