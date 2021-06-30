import React from "react";
import { Component } from "react";
import Modal from "@material-ui/core/Modal";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Input } from "@material-ui/core";

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

const ProfilePicture = styled.img``;

const TextFieldStyle = {
  paddingBottom: "0.6rem",
};

const UserImage = styled.div`
  background-image: url(${(props) => props.picture});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  z-index: 1;
  width: 9rem;
  height: 9rem;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  color: black;
  border: solid grey 3px;
`;

const GenericAvatar = styled.div`
  background-color: rgb(22, 204, 152);
  display: flex;
  flex-direction: column;
  width: 3rem;
  height: 3rem;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  color: white;
`;

const ProfileDataWrapper = styled.div`
  width: 83%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

class ProfileModal extends Component {
  state = {};

  render() {
    return (
      <div>
        <StyledModal
          open={this.props.profileModalIsOpen}
          onClose={() => this.props.toggleProfileModalOpen()}
        >
          <ModalBody>
            <ModalHeader>Profile</ModalHeader>
            {this.props.user.picture !== null ? (
              <Button>
                <UserImage picture={this.props.user.picture}>
                  <input type="file" hidden />
                </UserImage>
              </Button>
            ) : (
              <GenericAvatar>
                <span>{`${this.props.user.firstName
                  .split("")[0]
                  .toUpperCase()}${this.props.user.lastName
                  .split("")[0]
                  .toUpperCase()}`}</span>
              </GenericAvatar>
            )}
            <ProfileDataWrapper>
              <span>Username</span>
              <span>{this.props.user.username}</span>
            </ProfileDataWrapper>
            <ProfileDataWrapper>
              <span>Name</span>
              <span>{`${this.props.user.firstName} ${this.props.user.lastName}`}</span>
            </ProfileDataWrapper>
            <ProfileDataWrapper>
              <span>Email</span>
              <span>{this.props.user.email}</span>
            </ProfileDataWrapper>
            <Button variant="contained" component="label">
              Upload File
              <input type="file" hidden />
            </Button>
            <Form>
              <TextField
                type="username"
                name="username"
                label="Username or Email"
                id="username"
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
                // onClick={() => this.props.handleSubmit(this.state.username)}
              >
                Create
              </Button>
            </Form>
          </ModalBody>
        </StyledModal>
      </div>
    );
  }
}

ProfileModal.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(ProfileModal);
