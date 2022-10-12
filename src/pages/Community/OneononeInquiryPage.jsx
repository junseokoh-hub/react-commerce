import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet-async";
import OutletLayout from "../../components/Layout/OutletLayout";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useFireStore } from "../../hooks/useFirestore";
import { useRecoilValue } from "recoil";
import { authUserAtom } from "../../store/authAtom";

const InquiryFieldset = styled.fieldset`
  height: 50vh;
  border: 2px solid ${(props) => props.theme.yellow.lighter};
  legend {
    font-size: 20px;
    font-weight: bold;
    color: ${(props) => props.theme.orange.normal};
  }
`;

const InquiryInputContainer = styled.article`
  margin: 0 auto;
  width: 60%;
  height: 100%;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 768px) {
    width: 80%;
  }
  @media screen and (max-width: 480px) {
    padding-top: 10px;
  }
`;

const InquiryInput = styled.input`
  height: 30px;
  border: 2px solid ${(props) => props.theme.orange.lighter};
  outline: none;
`;

const InquiryTextarea = styled.textarea`
  margin: 5px 0;
  border: 2px solid ${(props) => props.theme.orange.lighter};
  flex: 1;
  resize: none;
  outline: none;
`;

const InquiryBtn = styled.button`
  height: 30px;
  border: 1px solid ${(props) => props.theme.orange.lighter};
  background-color: ${(props) => props.theme.orange.normal};
  color: ${(props) => props.theme.whiteColor};
  font-weight: bold;
  &:active {
    background-color: ${(props) => props.theme.brown.normal};
  }
`;

const OneononeInquiryPage = () => {
  const authUser = useRecoilValue(authUserAtom);
  const { addDocument } = useFireStore("one-on-one-inquiry");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const inquirySubmitHandler = handleSubmit((data) => {
    if (Object.keys(errors).length === 0) {
      if (window.confirm("문의 사항을 제출하시겠습니까?")) {
        addDocument({
          title: data.inquiryTitle,
          content: data.inquiryContent,
          uid: authUser.user.uid,
        });
        navigate("/");
        reset();
      }
    }
  });

  const inquiryTitleValidation = {
    required: { value: true, message: "문의 사항의 제목을 입력해주세요." },
    minLength: { value: 5, message: "최소 5자 이상을 입력해주세요." },
  };

  const inquiryContentValidation = {
    required: { value: true, message: "문의 사항의 내용을 입력해주세요." },
    minLength: { value: 10, message: "최소 10자 이상을 입력해주세요." },
  };

  return (
    <>
      <Helmet>
        <title>1 : 1 문의</title>
      </Helmet>
      <OutletLayout>
        <InquiryFieldset>
          <legend>문의사항</legend>
          <InquiryInputContainer>
            <InquiryInput
              placeholder="문의 사항의 제목을 입력해주세요."
              {...register("inquiryTitle", inquiryTitleValidation)}
            />
            <InquiryTextarea
              placeholder="문의하실 사항에 대한 내용을 입력해주세요."
              {...register("inquiryContent", inquiryContentValidation)}
            />
            <InquiryBtn onClick={inquirySubmitHandler}>등록</InquiryBtn>
          </InquiryInputContainer>
        </InquiryFieldset>
      </OutletLayout>
    </>
  );
};

export default OneononeInquiryPage;
