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

const NameBanner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  height: 7vh;
  color: black;
  border-bottom: solid black 1px;
`;

const Name = styled.span`
  font-size: 2rem;
  font-weight: 200;
`;

class Messager extends React.Component {
  render() {
    return (
      <Wrapper>
        <NameBanner>
          <Name>Pat O</Name>
        </NameBanner>
        <Messages />
        <TextInput />
      </Wrapper>
    );
  }
}

export default Messager;
