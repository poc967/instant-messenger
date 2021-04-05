import React, { Component } from "react";
import Modal from "@material-ui/core/Modal";

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
        <Modal open={true}>
          <span>hey</span>
        </Modal>
      </div>
    );
  }
}

export default SignUpModal;
