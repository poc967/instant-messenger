import React, { Component } from "react";
import styled from "styled-components";
import axios from "axios";
import socket from "../socket";

// redux
import { connect } from "react-redux";
import PropTypes from "prop-types";

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
    activeConversation: {
      members: [],
      _id: null,
      isDirectMessage: null,
      messages: [],
      title: {},
    },
  };

  toggleActiveConversation = async (conversationId) => {
    await this.setState(
      {
        activeConversationId: conversationId,
      },
      () => {
        this.getActiveConversationMessages();
      }
    );
  };

  getActiveConversationMessages = async () => {
    const conversation = await axios.get(
      `http://localhost:8080/conversation/${this.state.activeConversationId}`
    );
    await this.setState({
      activeConversation: {
        members: conversation.data.conversation.members,
        _id: conversation.data.conversation._id,
        isDirectMessage: conversation.data.conversation.isDirectMessage,
        messages: conversation.data.conversation.messages,
        title: conversation.data.title,
      },
    });
  };

  onMessage = async (message, conversation) => {
    let messages = { ...this.state.activeConversation };
    try {
      const response = await axios.post("http://localhost:8080/message", {
        conversation,
        message,
      });
      messages.messages.push(response.data);
      await this.setState({
        messages,
      });
    } catch (error) {}
    // socket.emit('private message', {
    //   message,
    //   con
    // });
  };

  render() {
    return (
      <Wrapper>
        <ConversationsPipeline
          toggleActiveConversation={this.toggleActiveConversation}
          activeConversationId={this.state.activeConversationId}
        />
        <Messager
          activeConversationId={this.state.activeConversationId}
          conversation={this.state.activeConversation}
          onMessage={this.onMessage}
          currentUser={this.props.user.id}
        />
      </Wrapper>
    );
  }
}

Home.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
  user: state.auth.user,
});

export default connect(mapStateToProps, null)(Home);
