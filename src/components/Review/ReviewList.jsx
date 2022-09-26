import React from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { authUserAtom } from "../../store/authAtom";

const AllReviewList = styled.li`
  min-width: 700px;
  height: 40px;
  display: grid;
  grid-template-columns: 4fr 1fr 1fr;
  border: 1px solid rgba(0, 0, 0, 0.25);
  p {
    padding-left: 10px;
    display: flex;
    align-items: center;
  }
  span {
    padding-right: 10px;
    display: flex;
    align-items: center;
  }
  button {
    background-color: ${(props) => props.theme.orange.normal};
    color: ${(props) => props.theme.whiteColor};
    border: 1px solid ${(props) => props.theme.orange.lighter};
    font-weight: bolder;
  }
`;

const ReviewList = ({ review }) => {
  const navigate = useNavigate();
  const authUser = useRecoilValue(authUserAtom);

  const newReviewAuthor = review?.author
    .slice(0, 3)
    .padEnd(review?.author.length, "*");

  return (
    <>
      <AllReviewList>
        <p>{review?.title}</p>
        <span>{newReviewAuthor}</span>
        {review?.uid === authUser?.user?.uid && (
          <button onClick={() => navigate(`edit/${review?.id}`)}>
            수정하기
          </button>
        )}
      </AllReviewList>
      <hr />
    </>
  );
};

export default React.memo(ReviewList);
