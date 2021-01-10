import React from "react";
import styled from "styled-components";

import SingleConversationCard from "./SingleConversationCard";

const Container = styled.div`
  min-width: 25vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  background-color: rgb(235, 237, 237);
  overflow-y: scroll;
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
      </Container>
    );
  }
}

export default ConversationsPipeline;
