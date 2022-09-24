import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useTitle } from "../../hooks/useTitle";
import { useFireStore } from "../../hooks/useFirestore";
import { useRecoilValue } from "recoil";
import { authUserAtom } from "../../store/authAtom";
import { useMatch, useNavigate } from "react-router-dom";

const ReviewFormContainer = styled.section`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  form {
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

const ReviewNew = () => {
  useTitle(`Review - New`);
  const navigate = useNavigate();
  const authUser = useRecoilValue(authUserAtom);
  const { register, handleSubmit } = useForm();
  const editMatch = useMatch("edit/*");

  const { addDocument } = useFireStore("reviews");

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
    // maxLength: { value: 1000, message: "No more than 4" },
  };

  return (
    <ReviewFormContainer>
      <form onSubmit={submitReviewHandler}>
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
        <button type="submit">{!editMatch ? "작성하기" : "수정하기"}</button>
      </form>
    </ReviewFormContainer>
  );
};

export default ReviewNew;
