import React from "react";
import styled from "styled-components";

const Name = styled.span`
  font-size: 1.8rem;
  font-weight: 200;
  color: rgb(22, 204, 152);
`;

const LatestMessage = styled.span`
  font-size: 1rem;
  font-weight: 200;
`;

const Time = styled.span`
  font-size: 0.75rem;
  font-weight: 200;
  text-decoration: none;
`;

const Button = styled.a`
  background-color: ${(props) =>
    props.activeConversationId && props.activeConversationId === props.id
      ? "rgb(22, 204, 152)"
      : "white"};
  display: flex;
  width: 95%;
  min-height: 20vh;
  flex-direction: column;
  justify-content: space-evenly;
  border-radius: 0.15rem;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  padding: 1rem;
  text-decoration: none;

  &:hover {
    background-color: rgb(22, 204, 152);
    transition: 0.3s;
  }

  &:hover > span {
    color: white;
    transition: 0.3s;
  }
`;

const SingleConversationCard = (props) => {
  return (
    <Button href="#" onClick={() => props.toggleActiveConversation(props.id)}>
      <Name className="child">{`${props.conversation.title.firstName} ${props.conversation.title.lastName}`}</Name>
      <LatestMessage className="child">
        {props.conversation.latestMessage[0].message}
      </LatestMessage>
      {/* <Time className="child">
        {props.time ? <span>{props.time}</span> : null}
      </Time> */}
    </Button>
  );
};

export default SingleConversationCard;
