import React from "react";
import { Outlet, useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import OutletLayout from "../../components/Layout/OutletLayout";
import { useTitle } from "../../hooks/useTitle";

const ReviewSection = styled.section`
  min-height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
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
  const editMatch = useMatch("/community/review/edit");

  return (
    <OutletLayout>
      {!editMatch ? (
        <>
          <ReviewSection>
            <article>No Reviews...</article>
          </ReviewSection>
          <hr />
          <ReviewBtnContainer>
            <ReviewBtn onClick={() => navigate("edit")}>
              리뷰 작성하기
            </ReviewBtn>
          </ReviewBtnContainer>
        </>
      ) : (
        <Outlet />
      )}
    </OutletLayout>
  );
};

export default ReviewPage;
