import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

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

// background-color: rgb(235, 237, 237);

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

const convos = [
  { name: "Pat Oconnor", newestMessage: "Yooo whats good!?", time: Date.now() },
  { name: "Billy Bob", newestMessage: "Yooo whats good!?", time: Date.now() },
  { name: "Danielle A", newestMessage: "Yooo whats good!?", time: Date.now() },
  { name: "Ian Oconnor", newestMessage: "Yooo whats good!?", time: Date.now() },
  { name: "Pat Oconnor", newestMessage: "Yooo whats good!?", time: Date.now() },
  { name: "Bill Z", newestMessage: "Yooo whats good!?", time: Date.now() },
  { name: "Pat Oconnor", newestMessage: "Yooo whats good!?", time: Date.now() },
  { name: "Pat Oconnor", newestMessage: "Yooo whats good!?", time: Date.now() },
  { name: "Pat Oconnor", newestMessage: "Yooo whats good!?", time: Date.now() },
  { name: "Pat Oconnor", newestMessage: "Yooo whats good!?", time: Date.now() },
];

class ConversationsPipeline extends React.Component {
  render() {
    return (
      <Container>
        {convos.map((convo) => (
          <SingleConversationCard
            name={convo.name}
            latestMessage={convo.newestMessage}
            time={convo.time}
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
