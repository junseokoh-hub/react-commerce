import React from "react";
import styled from "styled-components";

const MyEnrollmentLists = styled.li`
  padding: 10px 5px;
  margin-bottom: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid black;
`;

const MyEnrollmentTitle = styled.h4`
  font-weight: bolder;
  @media screen and (max-width: 768px) {
    font-size: 14px;
  }
`;

const MyEnrollmentResult = styled.span`
  width: 100px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bolder;
  color: ${(props) => props.theme.whiteColor};
  background-color: ${(props) => props.theme.yellow.lighter};
  border: 1px solid ${(props) => props.theme.orange.normal};
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.orange.normal};
  }
`;

const MyEnrollmentList = ({ data }) => {
  return (
    <MyEnrollmentLists>
      <MyEnrollmentTitle>{data.event}</MyEnrollmentTitle>
      <MyEnrollmentResult>신청완료</MyEnrollmentResult>
    </MyEnrollmentLists>
  );
};

export default React.memo(MyEnrollmentList);
