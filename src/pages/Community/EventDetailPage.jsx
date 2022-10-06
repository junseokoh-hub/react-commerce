import React from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { EVENT_CONTENTS } from "../../lib/event-contents";
import { BsBoxArrowLeft } from "react-icons/bs";

const EventDetailWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  .backwards {
    position: absolute;
    top: 20px;
    left: 40px;
    font-size: 30px;
    cursor: pointer;
  }
`;

const EventDetailContainer = styled.div`
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    display: block;
    width: 50vw;
    height: 90vh;
  }
  @media screen and (max-width: 768px) {
    img {
      width: 55vw;
    }
  }

  @media screen and (max-width: 480px) {
    img {
      width: 80vw;
    }
  }
`;

const EventDetailTitle = styled.h3`
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 4px solid ${(props) => props.theme.yellow.lighter};
  font-size: 30px;
  font-weight: bolder;
  text-align: center;
`;

const EventDetailDesc = styled.div`
  width: 50vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${(props) => props.theme.brown.normal};
  color: #ddd;
  span {
    margin: 15px 0;
  }
`;

const EventDetailContent = styled.p`
  margin: 20px 0;
  width: 50%;
  font-size: 18px;
  font-weight: bolder;
  line-height: 1.5;
`;

const EventBtnContainer = styled.div`
  margin-bottom: 10px;
  width: 50vw;
  display: flex;
  justify-content: flex-end;
  button {
    width: 100px;
    height: 40px;
    font-weight: bold;
    background-color: ${(props) => props.theme.orange.normal};
    border: 1px solid ${(props) => props.theme.orange.lighter};
    color: ${(props) => props.theme.whiteColor};
    &:active {
      background-color: ${(props) => props.theme.brown.normal};
    }
  }
`;

const EventDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const EventDetail = EVENT_CONTENTS.find((item) => item.id === id);

  const { id: detailId, image: detailImage, description } = EventDetail;

  return (
    <EventDetailWrapper>
      <BsBoxArrowLeft className="backwards" onClick={() => navigate(-1)} />
      <EventDetailContainer>
        <EventDetailTitle>{description?.title}</EventDetailTitle>
        <img src={detailImage?.first} alt={detailId} />
        <img src={detailImage?.second} alt={detailId} />
        <img src={detailImage?.third} alt={detailId} />
        <EventDetailDesc>
          <EventDetailContent>{description?.content}</EventDetailContent>
          <span>일자 : {description?.end?.date}</span>
          <span>대상 : {description?.end?.subjected}</span>
        </EventDetailDesc>
      </EventDetailContainer>
      <EventBtnContainer>
        <button>신청하기</button>
      </EventBtnContainer>
    </EventDetailWrapper>
  );
};

export default EventDetailPage;
