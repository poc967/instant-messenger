import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const SingleConversationContainer = styled.div`
  background-color: white;
  display: flex;
  width: 95%;
  min-height: 20vh;
  flex-direction: column;
  justify-content: space-evenly;
  border-radius: 0.15rem;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  padding: 1rem;
`;

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
  background-color: white;
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
`;

const SingleConversationCard = (props) => {
  return (
    <Button href="#" onClick={() => props.toggleActiveConversation(props.id)}>
      <SingleConversationContainer>
        <Name>{props.name}</Name>
        <LatestMessage>{props.latestMessage}</LatestMessage>
        <Time>{props.time ? <span>{props.time}</span> : null}</Time>
      </SingleConversationContainer>
    </Button>
  );
};

export default SingleConversationCard;
