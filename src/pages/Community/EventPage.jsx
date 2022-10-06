import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { EVENT_CONTENTS } from "../../lib/event-contents";

const EventContainer = styled.div`
  margin: 0 auto;
  width: 50vw;
  min-height: 70vh;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  @media screen and (max-width: 480px) {
    width: 80vw;
  }
`;

const EventPost = styled.div`
  img {
    display: block;
    width: 100%;
    height: 300px;
    border-radius: 10px;
  }
  span {
    margin-top: 10px;
    display: flex;
    justify-content: center;
    font-size: 20px;
    font-weight: 600;
    color: ${(props) => props.theme.blackColor};
  }
  @media screen and (max-width: 480px) {
    span {
      font-size: 14px;
    }
  }
`;

const EventPage = () => {
  return (
    <>
      <EventContainer>
        {EVENT_CONTENTS.map(({ id, image }) => (
          <Link to={id} key={id}>
            <EventPost>
              <img src={image.first} alt={id} />
              <span>{id}</span>
            </EventPost>
          </Link>
        ))}
      </EventContainer>
    </>
  );
};

export default EventPage;
