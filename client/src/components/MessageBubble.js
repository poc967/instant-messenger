import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  background-color: ${(props) =>
    props.color === "true" ? "rgb(22, 204, 152)" : "lightgrey"};
  padding: 0.3rem;
  border-radius: 0.5rem;
  margin: 0.35rem;
`;

const Text = styled.span`
  font-size: 0.8rem;
  font-weight: 200;
`;

const MessageBubble = (props) => {
  return (
    <Wrapper color={`${props.authorIsCurrentUser}`}>
      <Text>{props.message}</Text>
    </Wrapper>
  );
};

export default MessageBubble;
