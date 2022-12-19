import React from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useCollection } from "../../hooks/useCollection";

const ReviewContentContainer = styled.article`
  margin: 0 auto;
  width: 60%;
  min-height: 60vh;
  border-radius: 10px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.3);
  h3,
  p {
    padding-left: 10px;
    margin: 10px 0;
  }
  @media screen and (max-width: 768px) {
    width: 90%;
  }
  @media screen and (max-width: 480px) {
    width: 100%;
  }
`;

const ReviewContentTitle = styled.h3`
  padding: 10px 0;
  margin-bottom: 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
`;

const ReviewContent = styled.p`
  min-height: calc(50vh - 10px);
`;

const ReviewContentBtn = styled.button`
  width: 100%;
  height: 50px;
  font-size: 20px;
  font-weight: bolder;
  color: ${(props) => props.theme.whiteColor};
  border: 1px solid ${(props) => props.theme.orange.lighter};
  background-color: ${(props) => props.theme.orange.normal};
  transition: 0.2s linear;
  &:hover {
    background-color: ${(props) => props.theme.brown.normal};
  }
`;

const ReviewContentPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { documents: reviews, error } = useCollection("reviews");

  const singleReview =
    !error &&
    reviews?.length > 0 &&
    reviews.find((review) => Number(review.createdTime.seconds) === Number(id));

  return (
    <ReviewContentContainer>
      <ReviewContentTitle>제목 : {singleReview.title}</ReviewContentTitle>
      <ReviewContent>내용 : {singleReview.content}</ReviewContent>
      <ReviewContentBtn onClick={() => navigate(-1)}>뒤로가기</ReviewContentBtn>
    </ReviewContentContainer>
  );
};

export default ReviewContentPage;
