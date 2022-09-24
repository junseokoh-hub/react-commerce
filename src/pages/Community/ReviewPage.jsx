import React, { useCallback } from "react";
import { Outlet, useMatch, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import OutletLayout from "../../components/Layout/OutletLayout";
import ReviewList from "../../components/Review/ReviewList";
import { useCollection } from "../../hooks/useCollection";
import { useTitle } from "../../hooks/useTitle";
import { authUserAtom } from "../../store/authAtom";

const ReviewIdentifier = styled.h3`
  margin-bottom: 30px;
  font-size: 40px;
  font-weight: bolder;
  text-align: center;
`;

const ReviewSection = styled.section`
  padding: 10px 0;
  min-height: 400px;
  display: flex;
  justify-content: center;
  border-radius: 2px;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25);
  article {
    min-height: inherit;
    ul {
      min-height: inherit;
    }
  }
`;

const ReviewBtnContainer = styled.div`
  display: flex;
  justify-content: end;
`;

const ReviewBtn = styled.button`
  height: 40px;
  border-radius: 10px;
  border: 1px solid ${(props) => props.theme.orange.lighter};
  background-color: ${(props) => props.theme.orange.normal};
  color: ${(props) => props.theme.whiteColor};
  font-weight: bold;
  &:hover {
    background-color: ${(props) => props.theme.brown.normal};
  }
`;

const ReviewPage = () => {
  useTitle("Review");
  const navigate = useNavigate();
  const reviewMatch = useMatch("/community/review");

  const authUser = useRecoilValue(authUserAtom);

  const { documents: reviews } = useCollection("reviews");

  const goEditPage = useCallback(() => {
    if (!authUser.user) {
      if (window.confirm(`로그인 하시겠습니까?`)) {
        navigate("/login");
      }
    }
    navigate("new");
  }, [authUser.user]);

  return (
    <OutletLayout>
      {reviewMatch && <ReviewIdentifier>Review</ReviewIdentifier>}
      {reviewMatch && (
        <>
          <ReviewSection>
            <article>
              {reviews?.length === 0 ? (
                "No Reviews..."
              ) : (
                <ul>
                  {reviews &&
                    reviews.map((review) => (
                      <ReviewList key={review.id} review={review} />
                    ))}
                </ul>
              )}
            </article>
          </ReviewSection>
          <hr />
          <ReviewBtnContainer>
            <ReviewBtn onClick={goEditPage}>리뷰 작성하기</ReviewBtn>
          </ReviewBtnContainer>
        </>
      )}
      <Outlet />
    </OutletLayout>
  );
};

export default ReviewPage;
