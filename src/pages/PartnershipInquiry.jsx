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
  padding: 10px 0;
  min-height: 100%;
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-top: 2px solid rgba(0, 0, 0, 0.5);
  border-bottom: 2px solid rgba(0, 0, 0, 0.5);
`;

const InquiryTable = styled.table`
  width: 700px;
  border: 1px solid black;
  border-collapse: collapse;
  caption {
    margin-bottom: 10px;
    font-size: 20px;
    font-weight: bolder;
  }
  tr,
  th,
  td {
    border: 1px solid black;
  }

  th {
    font-weight: bolder;
    background-color: lightgrey;
  }

  th {
    vertical-align: middle !important;
  }

  td:not(#text_table) {
    padding: 10px 0 10px 5px;
  }
  textarea {
    width: 100%;
    height: 400px;
    border: none;
    resize: none;
    &:focus {
      outline: none;
    }
  }
  @media screen and (max-width: 768px) {
    width: 500px;
  }
  @media screen and (max-width: 480px) {
    width: 400px;
  }
`;

const BtnContainer = styled.div`
  margin-top: 5px;
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
        <InquiryTable>
          <caption>파트너 문의</caption>
          <tr>
            <th>작성자</th>
            <td>
              <input {...register("inquiryAuthor")} />
            </td>
          </tr>
          <tr>
            <th>비밀번호</th>
            <td>
              <input {...register("inquiryPassword")} />
            </td>
          </tr>
          <tr>
            <th>제목</th>
            <td>
              <input {...register("inquiryTitle")} />
            </td>
          </tr>
          <tr>
            <th>본문</th>
            <td id="text_table">
              <textarea {...register("inquiryContent")} />
            </td>
          </tr>
        </InquiryTable>
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
