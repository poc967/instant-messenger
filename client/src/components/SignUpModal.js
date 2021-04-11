import React, { Component } from "react";
import Modal from "@material-ui/core/Modal";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";

// redux
import { registerUser } from "../actions/authActions";
import { connect } from "react-redux";

const TextFieldStyle = {
  paddingBottom: "0.6rem",
};

const ModalBody = styled.div`
  display: flex;
  width: 25vw;
  height: auto;
  background-color: white;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledModal = styled(Modal)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
`;

const ModalHeader = styled.span`
  font-size: 1.3rem;
  padding: 1rem;
`;

const Form = styled.form`
  width: 83%;
  display: flex;
  flex-direction: column;
  padding-bottom: 1.4rem;
`;

class SignUpModal extends Component {
  state = {
    username: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    email: "",
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const {
      username,
      password,
      confirmPassword,
      firstName,
      lastName,
      email,
    } = this.state;

    if (
      !username ||
      !password ||
      !confirmPassword ||
      !firstName ||
      !lastName ||
      !email
    ) {
      return;
    }

    if (password === confirmPassword) {
      try {
        this.props.registerUser(username, password, email, firstName, lastName);
      } catch (error) {}
    }
  };

  handleChange = async (e) => {
    await this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    return (
      <div>
        <StyledModal
          open={this.props.signUpModalIsOpen}
          onClose={() => this.props.toggleModalOpen()}
        >
          <ModalBody>
            <ModalHeader>Sign Up</ModalHeader>
            <Form>
              <TextField
                type="username"
                name="username"
                label="Username"
                id="username"
                variant="outlined"
                margin="dense"
                style={TextFieldStyle}
                onChange={this.handleChange}
              />
              <TextField
                type="email"
                name="email"
                label="Email"
                id="exampleEmail"
                variant="outlined"
                margin="dense"
                style={TextFieldStyle}
                onChange={this.handleChange}
              />
              <TextField
                type="firstName"
                name="firstName"
                label="First Name"
                id="firstName"
                variant="outlined"
                margin="dense"
                style={TextFieldStyle}
                onChange={this.handleChange}
              />
              <TextField
                type="lastName"
                name="lastName"
                label="Last Name"
                id="lastName"
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
              <TextField
                type="password"
                name="confirmPassword"
                label="Confirm Password"
                id="confirmPassword"
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
          </ModalBody>
        </StyledModal>
      </div>
    );
  }
}

SignUpModal.propTypes = {
  registerUser: PropTypes.func.isRequired,
};

export default connect(null, { registerUser })(SignUpModal);
