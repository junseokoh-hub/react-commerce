import React from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { EVENT_CONTENTS } from "../../lib/event-contents";
import { BsBoxArrowLeft } from "react-icons/bs";
import { useRecoilValue } from "recoil";
import { authUserAtom } from "../../store/authAtom";
import { useCallback } from "react";
import { useFireStore } from "../../hooks/useFirestore";
import { useCollection } from "../../hooks/useCollection";

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
  @media screen and (max-width: 768px) {
    .backwards {
      font-size: 24px;
    }
  }
  @media screen and (max-width: 480px) {
    .backwards {
      left: 20px;
    }
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
  @media screen and (max-width: 768px) {
    width: 55vw;
  }
  @media screen and (max-width: 480px) {
    width: 80vw;
  }
`;

const EventDetailContent = styled.p`
  margin: 20px 0;
  width: 50%;
  font-size: 18px;
  font-weight: bolder;
  line-height: 1.5;
  @media screen and (max-width: 768px) {
    width: 70%;
    line-height: 2;
  }
`;

const EventBtnContainer = styled.div`
  margin-bottom: 10px;
  width: 50vw;
  display: flex;
  justify-content: flex-end;

  @media screen and (max-width: 768px) {
    width: 55vw;
  }
  @media screen and (max-width: 480px) {
    width: 80vw;
  }
`;

const EnrollBtn = styled.button`
  width: 100px;
  height: 40px;
  font-weight: bold;
  background-color: ${(props) => props.btncolor};
  border: 1px solid ${(props) => props.theme.orange.lighter};
  color: ${(props) => props.theme.whiteColor};
  &:active {
    background-color: ${(props) => props.theme.brown.normal};
  }
`;

const EventDetailPage = () => {
  const authUser = useRecoilValue(authUserAtom);

  const { id } = useParams();
  const navigate = useNavigate();
  const EventDetail = EVENT_CONTENTS.find((item) => item.id === id);

  const { id: detailId, image: detailImage, description } = EventDetail;

  const { setDocument } = useFireStore("participation");
  const { documents: enrollments } = useCollection("participation");

  const date = description?.hold.split("-");
  const newDate = new Date(date[0], date[1] + 1, date[2]);
  const miliDate = Date.now(newDate);

  const enrollHandler = useCallback(() => {
    if (!authUser.user) {
      if (
        window.confirm(
          "로그인 하셔야 신청하실 수 있습니다. 로그인 하시겠습니까?",
        )
      ) {
        navigate("/login");
      }
    }
    if (authUser.user) {
      if (window.confirm("신청하시겠습니까?")) {
        setDocument(authUser.user.uid + id, {
          event: id,
          uid: authUser.user.uid,
          hold: miliDate,
        });
        navigate("/community/notification/event");
      }
    }
  }, [authUser.user, setDocument]);

  const eventConfirm = enrollments
    ?.filter((item) => item.uid === authUser.user.uid)
    ?.find((item) => item.id === authUser.user.uid + id);

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
          <span>시행 : {description?.hold}</span>
          <span>대상 : {description?.end?.subjected}</span>
        </EventDetailDesc>
      </EventDetailContainer>
      <EventBtnContainer>
        <EnrollBtn
          disabled={eventConfirm}
          onClick={enrollHandler}
          btncolor={
            eventConfirm
              ? (props) => props.theme.yellow.lighter
              : (props) => props.theme.orange.normal
          }
        >
          {eventConfirm ? "완료" : "신청하기"}
        </EnrollBtn>
      </EventBtnContainer>
    </EventDetailWrapper>
  );
};

export default EventDetailPage;
