import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";

import SingleConversationCard from "./SingleConversationCard";
import AddRoundedIcon from "@material-ui/icons/AddRounded";

const Container = styled.div`
  min-width: 25vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  background-color: lightslategrey;
  overflow-y: scroll;
`;

const AddButton = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  left: 25%;
  top: 89.5%;
  background-color: rgb(22, 204, 152);
  z-index: 1;
  width: 3rem;
  height: 3rem;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  color: white;
`;

class ConversationsPipeline extends React.Component {
  state = {
    convos: [],
  };

  async componentDidMount() {
    const conversations = await axios.get("http://localhost:8080/conversation");
    this.setState({
      convos: conversations.data,
    });
  }

  render() {
    return (
      <Container>
        {this.state.convos.map((convo, index) => (
          <SingleConversationCard
            id={convo.conversation._id}
            activeConversationId={this.props.activeConversationId}
            conversation={convo}
            toggleActiveConversation={this.props.toggleActiveConversation}
            key={index}
          />
        ))}
        <Link to="#">
          <AddButton>
            <AddRoundedIcon />
          </AddButton>
        </Link>
      </Container>
    );
  }
}

export default ConversationsPipeline;
