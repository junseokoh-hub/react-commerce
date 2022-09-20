import React from "react";
import styled from "styled-components";

const CommunityOutletLayout = styled.main`
  width: 100%;
  padding: 10px;
`;

const OutletLayout = ({ children }) => {
  return <CommunityOutletLayout>{children}</CommunityOutletLayout>;
};

export default OutletLayout;
