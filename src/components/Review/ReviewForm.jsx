import React, { useEffect } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useTitle } from "../../hooks/useTitle";
import { useFireStore } from "../../hooks/useFirestore";
import { useRecoilValue } from "recoil";
import { authUserAtom } from "../../store/authAtom";
import { useNavigate } from "react-router-dom";

const ReviewFormContainer = styled.section`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  article {
    display: flex;
    flex-direction: column;
    width: 500px;
    input,
    textarea,
    button {
      margin-bottom: 10px;
    }
    input {
      height: 30px;
    }
    textarea {
      height: 300px;
      resize: none;
    }
    button {
      height: 50px;
      border: ${(props) => props.theme.orange.lighter};
      outline: none;
      background-color: ${(props) => props.theme.orange.normal};
      color: ${(props) => props.theme.whiteColor};
      font-size: 20px;
      font-weight: bolder;
    }
  }
`;

const ReviewForm = ({ isEdit, singleReview, id }) => {
  useTitle(`Review - New`);
  const navigate = useNavigate();
  const authUser = useRecoilValue(authUserAtom);
  const { register, handleSubmit, setValue } = useForm();

  const { addDocument, updateDocument } = useFireStore("reviews");

  const submitReviewHandler = handleSubmit((data) => {
    if (
      data.reviewTitleInput.trim().length < 5 &&
      data.reviewContentInput.trim().length < 4
    ) {
      return;
    } else {
      addDocument({
        title: data.reviewTitleInput,
        content: data.reviewContentInput,
        author: authUser.user.displayName,
        uid: authUser.user.uid,
      });
      navigate("/community/review", { replace: true });
    }
  });

  const reviewTitleValidation = {
    required: { value: true, message: "You should enter title" },
    minLength: { value: 5, message: "Longer than 5" },
    maxLength: { value: 30, message: "No more than 30" },
  };

  const reviewContentValidation = {
    required: { value: true, message: "You should enter title" },
    minLength: { value: 4, message: "Longer than 4" },
    maxLength: { value: 4, message: "No more than 4" },
  };

  useEffect(() => {
    if (isEdit) {
      setValue("reviewTitleInput", singleReview && singleReview[0].title);
      setValue("reviewContentInput", singleReview && singleReview[0].content);
    }
  }, [singleReview]);

  return (
    <ReviewFormContainer>
      <article>
        <input
          // value={!isEdit || (singleReview && singleReview[0].title)}
          {...register("reviewTitleInput", reviewTitleValidation)}
          type="text"
          placeholder="제목"
        />
        <textarea
          // value={!isEdit || (singleReview && singleReview[0].content)}
          {...register("reviewContentInput", reviewContentValidation)}
          type="text"
          placeholder="리뷰 내용"
        />
        <button onClick={submitReviewHandler} type="submit">
          {!isEdit ? "작성하기" : "수정하기"}
        </button>
        {isEdit && (
          <button
          // onClick={() => {
          //   updateDocument(id);
          // }}
          >
            삭제하기
          </button>
        )}
      </article>
    </ReviewFormContainer>
  );
};

export default ReviewForm;
