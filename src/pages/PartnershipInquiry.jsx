import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useFireStore } from "../hooks/useFirestore";
import { useRecoilValue } from "recoil";
import { authUserAtom } from "../store/authAtom";

const InquiryWrapper = styled.section`
  min-height: 50vh;
  display: flex;
  justify-content: center;
`;

const InquiryContainer = styled.article`
  margin: 10px 0;
  min-height: 100%;
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-top: 2px solid rgba(0, 0, 0, 0.5);
  border-bottom: 2px solid rgba(0, 0, 0, 0.5);
  ul {
    width: 100%;
    li {
      display: flex;
      border-bottom: 1px solid #7f8c8d;
      span {
        margin-right: 20px;
        padding-left: 15px;
        width: 150px;
        display: flex;
        align-items: center;
        font-size: 18px;
        font-weight: bolder;
        background-color: lightgrey;
      }
    }
  }
  input,
  textarea {
    margin: 10px 0;
  }

  input {
    width: 300px;
    height: 30px;
  }
  textarea {
    width: 500px;
    height: 400px;
    resize: vertical;
  }
`;

const BtnContainer = styled.div`
  margin: 10px 0;
  button {
    margin: 0 10px;
    width: 100px;
    height: 50px;
    border: 1px solid lightgrey;
    font-size: 18px;
    font-weight: bolder;
    &:nth-of-type(2) {
      background-color: ${(props) => props.theme.orange.normal};
      color: ${(props) => props.theme.whiteColor};
    }
  }
`;

const PartnershipInquiry = () => {
  const authUser = useRecoilValue(authUserAtom);
  const navigate = useNavigate();

  const { addDocument } = useFireStore("partnership-inquiry");

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm();

  const submitInquiryHandler = handleSubmit((data) => {
    const { inquiryAuthor, inquiryPassword, inquiryTitle, inquiryContent } =
      data;
    if (inquiryAuthor && inquiryPassword && inquiryTitle && inquiryContent) {
      addDocument({
        author: inquiryAuthor,
        password: inquiryPassword,
        title: inquiryTitle,
        content: inquiryContent,
        uid: authUser.user.uid,
      });
      reset();
      navigate("/", { replace: true });
    }
  });

  console.log("rendering");
  return (
    <InquiryWrapper>
      <InquiryContainer>
        <ul>
          <li>
            <span>작성자</span>
            <input {...register("inquiryAuthor")} />
          </li>
          <li>
            <span>비밀번호</span>
            <input {...register("inquiryPassword")} />
          </li>
          <li>
            <span>제목</span>
            <input {...register("inquiryTitle")} />
          </li>
          <li>
            <span>본문</span>
            <textarea {...register("inquiryContent")} />
          </li>
        </ul>
        <BtnContainer>
          <button onClick={() => navigate(-1)}>이전</button>
          <button
            disabled={isSubmitting}
            type="submit"
            onClick={submitInquiryHandler}
          >
            저장
          </button>
        </BtnContainer>
      </InquiryContainer>
    </InquiryWrapper>
  );
};

export default PartnershipInquiry;
