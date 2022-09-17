import React from "react";
import styled from "styled-components";
import { useQuery } from "react-query";
import { useTitle } from "../hooks/useTitle";
import perfumeImg from "../images/perfume1.jpg";
import StyledSlider from "../utils/StyledSlider";

const MainImgContainer = styled.div`
  width: 100%;
  height: 90vh;
  background: url(${(props) => props.bgphoto});
  background-position: 100%;
  background-size: 50%;
  background-repeat: no-repeat;
`;

const Home = () => {
  useTitle("Home");
  const { isLoading, data } = useQuery(
    ["products"],
    async () => {
      const response = await fetch(`https://fakestoreapi.com/products`);
      const json = await response.json();
      return json;
    },
    {
      staleTime: 50000,
    },
  );

  return (
    <StyledSlider>
      {isLoading && <div>Loading...</div>}
      {!isLoading &&
        data &&
        data.map((data) => <MainImgContainer bgphoto={data.image} />)}
    </StyledSlider>
  );
};

export default Home;
