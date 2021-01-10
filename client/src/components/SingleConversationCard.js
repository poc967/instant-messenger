import React from "react";
import styled from "styled-components";

const SingleConversationContainer = styled.div`
  background-color: white;
  display: flex;
  width: 95%;
  min-height: 20vh;
  flex-direction: column;
  justify-content: flex-start;
  border-radius: 0.15rem;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  padding: 1rem;
`;

const Name = styled.span`
  font-size: 1rem;
  font-weight: 300;
  color: rgb(22, 204, 152);
`;

const LatestMessage = styled.span`
  font-size: 0.75rem;
  font-weight: 200;
`;

const SingleConversationCard = (props) => {
  return (
    <SingleConversationContainer>
      <Name>{props.name}</Name>
      <LatestMessage>{props.latestMessage}</LatestMessage>
      <span>{props.time}</span>
    </SingleConversationContainer>
  );
};

export default SingleConversationCard;
