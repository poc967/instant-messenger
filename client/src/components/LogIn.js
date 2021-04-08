import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import SignUpModal from "./SignUpModal";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

// redux
import { authenticateUser } from "../actions/authActions";
import { clearError } from "../actions/errorActions";
import { connect } from "react-redux";

const ComponentWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: grey;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-image: url(images/login.jpg);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const LoginCard = styled.div`
  background-color: rgba(255, 255, 255, 0.5);
  width: 25vw;
  border-radius: 5px;
  backdrop-filter: blur(2px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
`;

const Form = styled.form`
  width: 83%;
  display: flex;
  flex-direction: column;
  padding-bottom: 1.4rem;
`;

const Title = styled.h1`
  font-weight: 200;
  margin: 1rem 0 0 0;
`;

const Span = styled.span`
  font-weight: 200;
  font-size: 1rem;
  padding: 0.8rem;
`;

const Link = styled.a`
  text-decoration: none;
`;

const TextFieldStyle = {
  paddingBottom: "0.6rem",
};
class LogIn extends Component {
  state = {
    username: "",
    password: "",
    signUpModalIsOpen: false,
  };

  toggleModalOpen = async () => {
    await this.setState({
      signUpModalIsOpen: !this.state.signUpModalIsOpen,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { username, password } = this.state;

    if (!username || !password) {
      return;
    }

    try {
      this.props.authenticateUser(username, password);
    } catch (error) {
      console.log(error);
    }
  };

  handleClose = () => {
    this.props.clearError();
  };

  handleChange = (e) => {
    e.preventDefault();

    const key = e.target.name;
    const value = e.target.value;

    this.setState({
      [key]: value,
    });
  };

  render() {
    if (this.props.isAuthenticated) return <Redirect to="/" />;
    return (
      <ComponentWrapper>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          open={this.props.error !== null}
          autoHideDuration={6000}
          onClose={this.handleClose}
        >
          <MuiAlert
            severity={() => {
              switch (this.props.error) {
                case "Unauthorized":
                  return "error";
                default:
                  return "info";
              }
            }}
            onClose={this.handleClose}
          >
            {() => {
              switch (this.props.error) {
                case "Unauthorized":
                  return "Invalid login credentials";
                default:
                  return "We are having trouble completing your request";
              }
            }}
          </MuiAlert>
        </Snackbar>
        <LoginCard>
          <Title>Log In</Title>
          <Form>
            <TextField
              type="username"
              name="username"
              label="Username"
              id="exampleEmail"
              variant="outlined"
              margin="dense"
              style={TextFieldStyle}
              onChange={this.handleChange}
            />
            <TextField
              type="password"
              name="password"
              label="Password"
              id="password"
              variant="outlined"
              margin="dense"
              style={TextFieldStyle}
              onChange={this.handleChange}
            />
            <Button
              color="primary"
              style={{
                backgroundColor: "rgb(22, 204, 152, 0.7)",
                color: "white",
              }}
              onClick={this.handleSubmit}
            >
              Let's Go!
            </Button>
          </Form>
        </LoginCard>
        <LoginCard>
          <Span>
            Not a member yet?{" "}
            <Link
              href="#"
              onClick={() => this.toggleModalOpen(this.state.signUpModalIsOpen)}
            >
              Sign Up
            </Link>
          </Span>
          <SignUpModal
            signUpModalIsOpen={this.state.signUpModalIsOpen}
            toggleModalOpen={this.toggleModalOpen}
          />
        </LoginCard>
      </ComponentWrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error.error,
});

LogIn.propTypes = {
  authenticateUser: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

export default connect(mapStateToProps, { authenticateUser, clearError })(
  LogIn
);
