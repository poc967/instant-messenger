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
`;

class Messager extends React.Component {
  render() {
    return (
      <Wrapper>
        <Messages />
        <TextInput />
      </Wrapper>
    );
  }
}

export default Messager;
