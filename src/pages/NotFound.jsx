import React from "react";
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
  return <NotFoundImage>You are in a wrong page!</NotFoundImage>;
};

export default NotFound;
