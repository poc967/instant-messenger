import React from "react";
import { Component } from "react";
import Modal from "@material-ui/core/Modal";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Input } from "@material-ui/core";
import ProfileData from "./ProfileData";
import axios from "axios";
import FormData from "form-data";
import fs from "fs";

const ModalBody = styled.div`
  display: flex;
  min-width: 25vw;
  height: auto;
  background-color: rgb(245, 118, 183);
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
  color: white;
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
  background-color: white;
`;

const GenericAvatar = styled.div`
  background-color: rgb(22, 204, 152);
  display: flex;
  flex-direction: column;
  width: 9rem;
  height: 9rem;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  color: white;
  font-size: 3rem;
`;

const ProfileDataWrapper = styled.div`
  width: 83%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const EditPictureButton = styled(Button)`
  border-radius: 50%;

  &:hover {
    color: lightgreen;
    transition: 0.3s;
  }
`;

const ModalFooter = styled.div`
  background-color: white;
  width: 100%;
  padding: 1rem;
  padding-top: 0;
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
`;

class ProfileModal extends Component {
  state = {
    firstName: "",
    lastName: "",
    profileImageUrl: null,
    profileUploadLoading: false,
  };

  handlePictureUpload = async (filePath) => {
    let data = new FormData();
    data.append("file", filePath.target.files[0]);
    try {
      await this.setState({
        profileUploadLoading: true,
      });
      const config = {
        url: `${process.env.REACT_APP_base_url}/user/upload-profile-image`,
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data,
      };
      const response = await axios(config);
      await this.setState({
        profileImageUrl: response.data.data,
        profileUploadLoading: false,
      });
      return;
    } catch (error) {
      console.log(error);
      this.setState({
        profileUploadLoading: false,
      });
      return;
    }
  };

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
              <Button
                component="label"
                style={{ borderRadius: "50%" }}
                onChange={(e) => console.log(e)}
              >
                <UserImage
                  picture={
                    this.state.profileImageUrl === null
                      ? this.props.user.picture
                      : this.state.profileImageUrl
                  }
                >
                  <input
                    type="file"
                    hidden
                    onChange={(e) => this.handlePictureUpload(e)}
                  />
                </UserImage>
              </Button>
            ) : (
              <Button component="label" style={{ borderRadius: "50%" }}>
                <input type="file" hidden />
                <GenericAvatar>
                  <span>{`${this.props.user.firstName
                    .split("")[0]
                    .toUpperCase()}${this.props.user.lastName
                    .split("")[0]
                    .toUpperCase()}`}</span>
                </GenericAvatar>
              </Button>
            )}
            <ProfileData userData={this.props.user} />
            <ModalFooter>
              <Button
                color="primary"
                style={{
                  backgroundColor: "rgb(22, 204, 152, 0.7)",
                  color: "white",
                }}
                disabled
              >
                save
              </Button>
            </ModalFooter>
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
