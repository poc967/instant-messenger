import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: block;
  background-color: ${(props) => (props.color ? "lightgreen" : "lightgrey")};
`;

const MessageBubble = (props) => {
  return (
    <Wrapper color={props.authorIsCurrentUser}>
      <span>{props.message}</span>
    </Wrapper>
  );
};

export default MessageBubble;
