import logo from "./logo.svg";
import styled from "styled-components";
import "./App.css";
import { Component } from "react";
import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

// components
import LogIn from "./components/LogIn";
import Wrapper from "./components/Wrapper";

const AppWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: lightgrey;
  margin: 0;
  padding: 0;
`;

class App extends Component {
  render() {
    return (
      <AppWrapper>
        <BrowserRouter>
          <Switch>
            <Route path="/login" component={LogIn} />
            <Route path="/" component={Wrapper} />
          </Switch>
        </BrowserRouter>
      </AppWrapper>
    );
  }
}

export default App;
