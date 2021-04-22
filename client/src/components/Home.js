import React, { Component } from "react";
import styled from "styled-components";
import axios from "axios";
import socket from "../socket";

// redux
import { connect } from "react-redux";
import { returnError, clearError } from "../actions/errorActions";
import PropTypes from "prop-types";

import ConversationsPipeline from "./ConversationsPipeline";
import Messager from "./Messager";
import NewConversationModal from "./NewConversationModal";
import ErrorComponent from "./Error";

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
    conversationModalIsOpen: false,
  };

  // On component did mount, fetch conversation data to populate conversation pipeline
  async componentDidMount() {
    const conversations = await axios.get("http://localhost:8080/conversation");
    this.setState({
      conversations: conversations.data,
    });

    socket.on("private message", async ({ message, conversation }) => {
      // if the convo id on the incoming messages matches the id of
      // the order the user has open we will push the message

      if (this.state.activeConversationId === conversation) {
        let messages = { ...this.state.activeConversation };
        console.log(messages);
        messages = messages.messages.push(message);
        this.setState({
          messages,
        });
      }
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
        conversation: this.state.activeConversation._id,
      });
    } catch (error) {}
  };

  // open conversation modal
  toggleModalOpen = async () => {
    await this.setState({
      conversationModalIsOpen: !this.state.conversationModalIsOpen,
    });
  };

  // handle user search and conversation creation
  handleSubmit = async (user) => {
    let conversations = this.state.conversations;
    if (!user) {
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/conversation", {
        user,
      });
      // push new convo onto state
      conversations.push(response.data);
      this.setState({
        conversations: conversations,
      });
      this.toggleModalOpen();
    } catch (error) {
      this.props.returnError(error);
    }
  };

  render() {
    return (
      <Wrapper>
        <ErrorComponent />
        <ConversationsPipeline
          toggleActiveConversation={this.toggleActiveConversation}
          activeConversationId={this.state.activeConversationId}
          conversations={this.state.conversations}
          toggleModalOpen={this.toggleModalOpen}
        />
        <Messager
          activeConversationId={this.state.activeConversationId}
          conversation={this.state.activeConversation}
          onMessage={this.onMessage}
          currentUser={this.props.user.id}
        />
        <NewConversationModal
          modalIsOpen={this.state.conversationModalIsOpen}
          toggleModalOpen={this.toggleModalOpen}
          handleSubmit={this.handleSubmit}
        />
      </Wrapper>
    );
  }
}

Home.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  returnError: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
  user: state.auth.user,
});

export default connect(mapStateToProps, { returnError, clearError })(Home);
