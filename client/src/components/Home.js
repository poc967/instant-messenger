import React, { Component } from "react";
import styled from "styled-components";

import ConversationsPipeline from "./ConversationsPipeline";
import Messager from "./Messager";

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  justify-content: flex-start;
  background-color: white;
`;

class Home extends Component {
  state = {
    activeConversationId: null,
    conversationLoading: false,
  };

  toggleActiveConversation = (conversationId) => {
    this.setState({
      activeConversationId: conversationId,
    });
    console.log(this.state);
  };

  render() {
    return (
      <Wrapper>
        <ConversationsPipeline
          toggleActiveConversation={this.toggleActiveConversation}
        />
        <Messager />
      </Wrapper>
    );
  }
}

export default Home;
