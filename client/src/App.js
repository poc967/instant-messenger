import styled from "styled-components";
import "./App.css";
import { Component } from "react";
import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

// redux
import { getUser } from "./actions/authActions";
import { connect } from "react-redux";
import { configureStore } from "./store";
import PropTypes from "prop-types";
import socket from "./socket";

// components
import LogIn from "./components/LogIn";
import Wrapper from "./components/Wrapper";
import PrivateRoute from "./components/PrivateRoute";

const AppWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: lightgrey;
  margin: 0;
  padding: 0;
`;

const { store } = configureStore();

class App extends Component {
  componentDidMount() {
    store.dispatch(getUser());
  }

  onAuthentication = () => {
    socket.auth = { userId: this.props.user.id };
    socket.connect();
  };

  render() {
    if (this.props.isAuthenticated) {
      this.onAuthentication();
    }
    return (
      <AppWrapper>
        <BrowserRouter>
          <Switch>
            <Route
              path="/login"
              component={LogIn}
              isLoggedIn={this.props.isAuthenticated}
            />
            <PrivateRoute
              exact
              path="/"
              component={Wrapper}
              isLoggedIn={this.props.isAuthenticated}
            />
          </Switch>
        </BrowserRouter>
      </AppWrapper>
    );
  }
}

App.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
  user: state.auth.user,
});

export default connect(mapStateToProps, null)(App);
