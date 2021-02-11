import React from "react";
import styled from "styled-components";

import MessageBubble from "./MessageBubble";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  color: black;
  align-items: flex-start;
  height: 100%;
  overflow-y: scroll;
  margin: 1rem;
`;

const AlignmentContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: ${(props) =>
    props.authorIsCurrentUser ? "flex-end" : "flex-start"};
  justify-content: ${(props) =>
    props.authorIsCurrentUser ? "flex-end" : "flex-start"};
  width: 100%;
  height: auto;
`;

const messages = [
  { message: "test", authorIsCurrentUser: true },
  { message: "hi", authorIsCurrentUser: false },
  { message: "how are you?", authorIsCurrentUser: true },
];

const Messages = (props) => {
  return (
    <Wrapper>
      {messages.map((message) => (
        <AlignmentContainer authorIsCurrentUser={message.authorIsCurrentUser}>
          <MessageBubble
            message={message.message}
            authorIsCurrentUser={message.authorIsCurrentUser}
          />
        </AlignmentContainer>
      ))}
    </Wrapper>
  );
};

export default Messages;
