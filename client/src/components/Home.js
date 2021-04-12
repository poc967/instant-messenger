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
  // initailize state
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
    conversations: [],
  };

  // On component did mount, fetch conversation data to populate conversation pipeline
  async componentDidMount() {
    const conversations = await axios.get("http://localhost:8080/conversation");
    this.setState({
      conversations: conversations.data,
    });

    socket.on("private message", async ({ message, conversation }) => {
      // need to update this logic to check the active convo first and then the convo list OR just do both ny default
      let messages = { ...this.state.activeConversation };
      messages.messages.push(message);
      await this.setState({
        messages,
      });
    });
  }

  // helper function for setting the selected conversation from the pipeline as active
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

  // Helper function for fetching the active conversation messages to display in the chat window upon selection
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

  // Helper function for sending new private messages
  onMessage = async (message, conversation) => {
    let messages = { ...this.state.activeConversation };
    let recipient = this.state.activeConversation.members.filter((member) => {
      return member._id != this.props.user.id;
    });
    try {
      const response = await axios.post("http://localhost:8080/message", {
        conversation,
        message,
      });
      messages.messages.push(response.data);
      await this.setState({
        messages,
      });
      socket.emit("private message", {
        message: response.data,
<<<<<<< Updated upstream
        // to: recipient.pop()._id,
        to: this.state.activeConversation._id,
=======
        conversation: this.state.activeConversation._id,
>>>>>>> Stashed changes
      });
    } catch (error) {}
  };

  render() {
    return (
      <Wrapper>
        <ConversationsPipeline
          toggleActiveConversation={this.toggleActiveConversation}
          activeConversationId={this.state.activeConversationId}
          conversations={this.state.conversations}
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
