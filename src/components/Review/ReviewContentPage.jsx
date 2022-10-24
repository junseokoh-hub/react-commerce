import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useCollection } from "../../hooks/useCollection";

const ReviewContentContainer = styled.article`
  min-height: 60vh;
  border: 1px solid black;
  h3,
  h4,
  p {
    margin: 10px 0;
    text-align: center;
  }
`;

const ReviewContentTitle = styled.h3``;

const ReviewContentAuthor = styled.h4``;

const ReviewContent = styled.p`
  height: 100%;
`;

const ReviewContentPage = () => {
  const { id } = useParams();
  const { documents: reviews, error } = useCollection("reviews");

  const singleReview =
    !error &&
    reviews?.length > 0 &&
    reviews.find((review) => Number(review.createdTime.seconds) === Number(id));

  return (
    <ReviewContentContainer>
      <ReviewContentTitle>제목 : {singleReview.title}</ReviewContentTitle>
      <ReviewContentAuthor>작성자 : {singleReview.author}</ReviewContentAuthor>
      <ReviewContent>본문 : {singleReview.content}</ReviewContent>
    </ReviewContentContainer>
  );
};

export default ReviewContentPage;
