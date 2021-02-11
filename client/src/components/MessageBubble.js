import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: block;
  background-color: ${(props) =>
    props.color ? "rgb(22, 204, 152)" : "lightgrey"};
  padding: 0.3rem;
  border-radius: 0.5rem;
`;

const Text = styled.span`
  font-size: 1.2rem;
  font-weight: 200;
`;

const MessageBubble = (props) => {
  return (
    <Wrapper color={props.authorIsCurrentUser}>
      <Text>{props.message}</Text>
    </Wrapper>
  );
};

export default MessageBubble;
