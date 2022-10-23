import React from "react";
import styled from "styled-components";

const MyReviewLists = styled.li`
  padding: 10px 5px;
  margin-bottom: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid black;
`;

const MyReviewTitle = styled.h4`
  font-weight: 600;
  @media screen and (max-width: 480px) {
    font-size: 13px;
  }
`;

const MyReviewTime = styled.span`
  font-size: 13px;
  @media screen and (max-width: 480px) {
    display: none;
  }
`;

const MyReviewList = ({ data }) => {
  const createdDate = new Date(
    data.createdTime.seconds * 1000,
  ).toLocaleString();

  return (
    <MyReviewLists key={data.createdTime}>
      <MyReviewTitle>{data.title}</MyReviewTitle>
      <MyReviewTime>{createdDate}</MyReviewTime>
    </MyReviewLists>
  );
};

export default React.memo(MyReviewList);
