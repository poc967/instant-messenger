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
  height: auto;
  color: black;
`;

const Name = styled.span`
  font-size: 1rem;
  font-weight: 200;
  margin-left: 1rem;
`;

const UserImage = styled.div`
  background-image: url(${(props) => props.picture});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  z-index: 1;
  width: 5rem;
  height: 5rem;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  color: black;
`;

const GenericAvatar = styled.div`
  background-color: rgb(22, 204, 152);
  display: flex;
  flex-direction: column;
  width: 5rem;
  height: 5rem;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  color: white;
`;

const ImageAlign = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
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
            <ImageAlign>
              {props.conversation.title.picture !== null ? (
                <UserImage picture={props.conversation.title.picture} />
              ) : (
                <GenericAvatar>
                  <span>{`${props.conversation.title.firstName
                    .split("")[0]
                    .toUpperCase()}${props.conversation.title.lastName
                    .split("")[0]
                    .toUpperCase()}`}</span>
                </GenericAvatar>
              )}
              <Name>{`${props.conversation.title.firstName} ${props.conversation.title.lastName}`}</Name>
            </ImageAlign>
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
