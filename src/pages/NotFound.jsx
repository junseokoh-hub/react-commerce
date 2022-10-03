import React from "react";
import { Helmet } from "react-helmet-async";
import styled from "styled-components";

const NotFoundImage = styled.div`
  height: 38vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 50px;
  font-weight: bolder;
`;

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>Not Found</title>
      </Helmet>
      <NotFoundImage>You are in a wrong page!</NotFoundImage>
    </>
  );
};

export default NotFound;
