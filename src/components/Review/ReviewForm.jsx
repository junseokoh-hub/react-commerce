import React, { useEffect } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useFireStore } from "../../hooks/useFirestore";
import { useRecoilValue } from "recoil";
import { authUserAtom } from "../../store/authAtom";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useCallback } from "react";

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
  const navigate = useNavigate();
  const authUser = useRecoilValue(authUserAtom);
  const { register, handleSubmit, setValue } = useForm();

  const { addDocument, updateDocument, deleteDocument } =
    useFireStore("reviews");

  const submitReviewHandler = handleSubmit((data) => {
    if (
      data.reviewTitleInput.trim().length < 5 &&
      data.reviewContentInput.trim().length < 4
    ) {
      return;
    }
    if (!isEdit) {
      addDocument({
        title: data.reviewTitleInput,
        content: data.reviewContentInput,
        author: authUser.user.displayName,
        uid: authUser.user.uid,
      });
    } else {
      updateDocument(id, {
        title: data.reviewTitleInput,
        content: data.reviewContentInput,
      });
    }
    navigate("/community/review", { replace: true });
  });

  const reviewTitleValidation = {
    required: { value: true, message: "You should enter title" },
    minLength: { value: 5, message: "Longer than 5" },
    maxLength: { value: 30, message: "No more than 30" },
  };

  const reviewContentValidation = {
    required: { value: true, message: "You should enter title" },
    minLength: { value: 4, message: "Longer than 4" },
    maxLength: { value: 100, message: "No more than 4" },
  };

  const deleteReviewHandler = useCallback(() => {
    if (window.confirm("이 리뷰를 정말 삭제하시겠습니까?")) {
      deleteDocument(id);
      navigate("/community/review");
    }
  }, []);

  useEffect(() => {
    if (isEdit) {
      setValue("reviewTitleInput", singleReview && singleReview[0]?.title);
      setValue("reviewContentInput", singleReview && singleReview[0]?.content);
    }
  }, [singleReview]);

  return (
    <>
      <Helmet>
        <title>Review - New</title>
      </Helmet>
      <ReviewFormContainer>
        <article>
          <input
            {...register("reviewTitleInput", reviewTitleValidation)}
            type="text"
            placeholder="제목"
          />
          <textarea
            {...register("reviewContentInput", reviewContentValidation)}
            type="text"
            placeholder="리뷰 내용"
          />
          <button onClick={submitReviewHandler} type="submit">
            {!isEdit ? "작성하기" : "수정하기"}
          </button>
          {isEdit && <button onClick={deleteReviewHandler}>삭제하기</button>}
        </article>
      </ReviewFormContainer>
    </>
  );
};

export default ReviewForm;
