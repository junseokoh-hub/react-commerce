import React from "react";
import { useState } from "react";
import styled from "styled-components";
import Modal from "../../../lib/Modal";

const MyReviewLists = styled.li`
  padding: 10px 5px;
  margin-bottom: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid black;
`;

const MyReviewTitle = styled.h4`
  font-weight: 600;
  @media screen and (max-width: 768px) {
    font-size: 14px;
  }
`;

const MyReviewTime = styled.span`
  font-size: 13px;
  @media screen and (max-width: 768px) {
    font-size: 11px;
  }
  @media screen and (max-width: 480px) {
    display: none;
  }
`;

const MyReviewModal = styled.div`
  padding: 10px;
  width: 30%;
  height: 50%;
  border-radius: 10px;
  background-color: white;
  position: fixed;
  top: 50%;
  left: 50%;
  line-height: 28px;
  transform: translate(-50%, -50%);
  z-index: 10000;
  overflow-y: auto;
  @media screen and (max-width: 768px) {
    width: 45%;
  }
  @media screen and (max-width: 480px) {
    width: 65%;
  }
`;

const MyReviewList = ({ data }) => {
  const [openReview, setOpenReview] = useState(false);
  const createdDate = new Date(
    data.createdTime.seconds * 1000,
  ).toLocaleString();

  return (
    <>
      {openReview && (
        <Modal closeModal={() => setOpenReview(false)}>
          <MyReviewModal>
            <p>{data.content}</p>
          </MyReviewModal>
        </Modal>
      )}
      <MyReviewLists onClick={() => setOpenReview(true)}>
        <MyReviewTitle>{data.title}</MyReviewTitle>
        <MyReviewTime>{createdDate}</MyReviewTime>
      </MyReviewLists>
    </>
  );
};

export default React.memo(MyReviewList);
