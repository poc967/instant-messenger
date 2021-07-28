import React from "react";
import { Switch, Route } from "react-router-dom";
import styled from "styled-components";

import NavigationBar from "./NavigationBar";
import Home from "./Home";

const MainWrapper = styled.div`
  display: block;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-direction: row;
`;

const AppContainer = styled.div`
  padding-left: 88px;
  display: flex;
  flex-direction: row;
`;

const Wrapper = () => {
  return (
    <MainWrapper>
      <NavigationBar />
      <AppContainer>
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </AppContainer>
    </MainWrapper>
  );
};

export default Wrapper;
