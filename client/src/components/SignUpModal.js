import React, { Component } from "react";
import Modal from "@material-ui/core/Modal";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

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
`;

const ModalHeader = styled.span`
  font-size: 1rem;
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
            <ModalHeader>hey</ModalHeader>
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
          </ModalBody>
        </StyledModal>
      </div>
    );
  }
}

export default SignUpModal;
