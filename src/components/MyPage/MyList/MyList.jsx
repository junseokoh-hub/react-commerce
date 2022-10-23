import React from "react";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { useCollection } from "../../../hooks/useCollection";
import { authUserAtom } from "../../../store/authAtom";
import MyReviewList from "./MyReviewList";
import MyEnrollmentList from "./MyEnrollmentList";

const ListWrapper = styled.section`
  padding-left: 20px;
  width: 70%;
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const ListContainer = styled.article`
  margin-bottom: 30px;
`;

const ListHeading = styled.h3`
  font-size: 20px;
  font-weight: bold;
  color: ${(props) => props.theme.orange.normal};
`;

const MyList = () => {
  const authUser = useRecoilValue(authUserAtom);
  const { documents: reviews, error } = useCollection("reviews");
  const { documents: enrollments, error: enrollError } =
    useCollection("participation");

  const myReviews =
    !error &&
    reviews &&
    reviews.filter((review) => review.uid === authUser.user.uid);

  const myEnrollments =
    !enrollError &&
    enrollments &&
    enrollments.filter((item) => item.uid === authUser.user.uid);

  return (
    <ListWrapper>
      <ListContainer>
        <ListHeading>나의 리뷰</ListHeading>
        <hr />
        <ul>
          {myReviews?.length > 0 &&
            myReviews.map((myReview) => (
              <MyReviewList key={myReview.createdTime} data={myReview} />
            ))}
        </ul>
      </ListContainer>
      <ListContainer>
        <ListHeading>나의 신청</ListHeading>
        <hr />
        <ul>
          {myEnrollments?.length > 0 &&
            myEnrollments.map((myEnrollment) => (
              <MyEnrollmentList
                key={myEnrollment.createdTime}
                data={myEnrollment}
              />
            ))}
        </ul>
      </ListContainer>
    </ListWrapper>
  );
};

export default MyList;
