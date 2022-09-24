import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useTitle } from "../../hooks/useTitle";
import { useFireStore } from "../../hooks/useFirestore";

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

const ReviewEditor = () => {
  useTitle(`Review - Edit`);
  const { register, handleSubmit, setValue } = useForm();

  const { addDocument } = useFireStore("reviews");

  const submitReviewHandler = handleSubmit((data) => {});
  return (
    <ReviewFormContainer>
      <form onSubmit={submitReviewHandler}>
        <input
          {...register("reviewTitleInput")}
          type="text"
          placeholder="제목"
        />
        <textarea
          {...register("reviewContentInput")}
          type="text"
          placeholder="리뷰 내용"
        />
        <button type="submit">작성하기</button>
      </form>
    </ReviewFormContainer>
  );
};

export default ReviewEditor;
