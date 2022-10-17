import React from "react";
import styled from "styled-components";

const MyProfileWrapper = styled.article`
  padding: 20px;
  min-height: 50vh;
  background-color: #ddd;
  border-radius: 10px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.7);
`;

const MyProfileLayout = ({ children }) => {
  return <MyProfileWrapper>{children}</MyProfileWrapper>;
};

export default MyProfileLayout;
