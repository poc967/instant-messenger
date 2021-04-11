import React from "react";
import styled from "styled-components";

import MessageBubble from "./MessageBubble";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column-reverse;
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

class Messages extends React.Component {
  authorIsCurrentUser = (currentUser, author) => {
    if (currentUser === author) {
      return true;
    } else {
      return false;
    }
  };

  render() {
    return (
      <Wrapper>
        {this.props.messages.messages !== null ? (
          this.props.messages.messages.reverse().map((message) => (
            <AlignmentContainer
              authorIsCurrentUser={this.authorIsCurrentUser(
                this.props.currentUser,
                message.author
              )}
            >
              <MessageBubble
                message={message.message}
                authorIsCurrentUser={this.authorIsCurrentUser(
                  this.props.currentUser,
                  message.author
                )}
              />
            </AlignmentContainer>
          ))
        ) : (
          <span>No messages yet!</span>
        )}
      </Wrapper>
    );
  }
}

export default Messages;
