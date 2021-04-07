import React from "react";
import styled from "styled-components";

import TextInput from "./TextInput";
import Messages from "./Messages";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  color: white;
  justify-content: flex-end;
  flex-direction: column;
  padding: 1rem;
  padding-top: 0;
`;

const NameBanner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  height: 4rem;
  color: black;
`;

const Name = styled.span`
  font-size: 1rem;
  font-weight: 200;
`;

const Messager = (props) => {
  return (
    <Wrapper>
      {!props.activeConversationId ? (
        <>
          <span style={{ color: "black" }}>No conversation selected</span>
        </>
      ) : (
        <>
          <NameBanner>
            <Name>{`${props.conversation.title.firstName} ${props.conversation.title.lastName}`}</Name>
          </NameBanner>
          <Messages
            activeConversationId={props.activeConversationId}
            messages={props.conversation}
            currentUser={props.currentUser}
          />
          <TextInput
            onMessage={props.onMessage}
            activeConversationId={props.activeConversationId}
          />
        </>
      )}
    </Wrapper>
  );
};

export default Messager;
