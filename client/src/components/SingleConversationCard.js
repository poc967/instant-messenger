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

const UserImage = styled.div`
  background-image: url(${(props) => props.picture});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  z-index: 1;
  width: 3rem;
  height: 3rem;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  color: black;
`;

const GenericAvatar = styled.div`
  background-color: rgb(22, 204, 152);
  display: flex;
  flex-direction: column;
  width: 3rem;
  height: 3rem;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  color: white;
`;

const PictureNameWrapper = styled.div`
  display: flex;
  flext-direction: row;
`;

const NameLatestMessageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-left: 1rem;
`;

const ImageAlign = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
      <PictureNameWrapper>
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
        </ImageAlign>
        <NameLatestMessageWrapper>
          <Name className="child">
            {`${props.conversation.title.firstName} ${props.conversation.title.lastName}`}{" "}
          </Name>
          {props.conversation.conversation.hasUnreadMessages &&
          props.currentUser.id !==
            props.conversation.conversation.messages[
              props.conversation.conversation.messages.length - 1
            ].author ? (
            <span style={{ color: "red" }}>!</span>
          ) : null}
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
        </NameLatestMessageWrapper>
      </PictureNameWrapper>
      {/* <Time className="child">
        {props.time ? <span>{props.time}</span> : null}
      </Time> */}
    </Button>
  );
};

export default SingleConversationCard;
