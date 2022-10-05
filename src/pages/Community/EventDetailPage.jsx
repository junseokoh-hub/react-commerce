import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { EVENT_CONTENTS } from "../../lib/event-contents";

const EventDetailWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const EventDetailContainer = styled.div`
  img {
    display: block;
    width: 50vw;
    height: 70vh;
  }
`;

const EventDetailPage = () => {
  const { id } = useParams();
  const EventDetail = EVENT_CONTENTS.find((item) => item.id === id);

  const { id: detailId, detailImage, description } = EventDetail;

  return (
    <EventDetailWrapper>
      <EventDetailContainer>
        <img src={detailImage.first} alt={detailId} />
        <img src={detailImage.second} alt={detailId} />
        <img src={detailImage.third} alt={detailId} />
        <span>{detailId}</span>
        <p>{description.title}</p>
      </EventDetailContainer>
    </EventDetailWrapper>
  );
};

export default EventDetailPage;
