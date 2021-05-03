import React from "react";
import styled from "styled-components";

const Name = styled.span`
  font-size: 1rem;
  font-weight: 200;
  color: rgb(22, 204, 152);
`;

const LatestMessage = styled.span`
  font-size: 0.75rem;
  font-weight: 200;
  color: black;
`;

const Time = styled.span`
  font-size: 0.75rem;
  font-weight: 200;
  text-decoration: none;
`;

const Button = styled.a`
  background-color: white;
  border: ${(props) =>
    props.activeConversationId === props.id
      ? "solid rgb(22, 204, 152) 4px"
      : "none"};
  display: flex;
  width: 95%;
  min-height: 4rem;
  flex-direction: column;
  justify-content: space-evenly;
  border-radius: 0.15rem;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  padding-left: 0.5rem;
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

const OnlineBadge = styled.div`
  font-size: 0.7rem;
  text-align: right;
  padding-right: 5px;
`;

// hide latest message on active convo card
const SingleConversationCard = (props) => {
  return (
    <Button
      href="#"
      onClick={() => props.toggleActiveConversation(props.id)}
      id={props.id}
      activeConversationId={props.activeConversationId}
    >
      <Name className="child">{`${props.conversation.title.firstName} ${props.conversation.title.lastName}`}</Name>
      <LatestMessage className="child">
        {props.conversation.latestMessage.length !== 0
          ? props.conversation.latestMessage[0].message
          : "No messages yet!"}
      </LatestMessage>
      <OnlineBadge>
        {props.conversation.online ? (
          <span style={{ color: "green" }}>Online</span>
        ) : (
          <span style={{ color: "red" }}>Offline</span>
        )}
      </OnlineBadge>
      {/* <Time className="child">
        {props.time ? <span>{props.time}</span> : null}
      </Time> */}
    </Button>
  );
};

export default SingleConversationCard;
