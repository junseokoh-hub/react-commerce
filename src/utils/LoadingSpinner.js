import React from "react";
import styled, { keyframes } from "styled-components";

const spinning = keyframes`
    from{
        transform: rotate(0deg);
    }

    to{
        transform: rotate(360deg);
    }
`;

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Spinner = styled.div`
  width: 100px;
  height: 100px;
  border-bottom: 10px solid ${(props) => props.theme.orange.lighter};
  border-top: 10px solid ${(props) => props.theme.orange.lighter};
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-radius: 50%;
  animation: ${spinning} 1s ease-in-out infinite;
`;

const LoadingSpinner = () => {
  return (
    <SpinnerContainer>
      <Spinner />
    </SpinnerContainer>
  );
};

export default LoadingSpinner;
