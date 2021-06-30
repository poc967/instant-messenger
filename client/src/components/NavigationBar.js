import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import PropTypes from "prop-types";
import ProfileModal from "./ProfileModal";

import { logoutUser } from "../actions/authActions";
import { connect } from "react-redux";

const Nav = styled(Drawer)`
  background-color: red;
  display: block;
  box-shadow: 10px 0 5px -2px #888;
`;

const StyledNavItem = styled(ListItemIcon)`
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
`;

const Button = styled.button`
  border: none;
  background-color: white;
`;

const LogOutIcon = styled(ExitToAppOutlinedIcon)`
  color: rgb(22, 204, 152);

  &:hover {
    color: lightgreen;
    transition: 0.3s;
  }
`;

const ProfileIcon = styled(PersonOutlineOutlinedIcon)`
  color: rgb(22, 204, 152);

  &:hover {
    color: lightgreen;
    transition: 0.3s;
  }
`;

const StyledListItem = styled(ListItem)``;

const UserImage = styled.div`
  background-image: url(${(props) => props.picture});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  position: absolute;
  left: 25%;
  top: 89.5%;
  z-index: 1;
  width: 3rem;
  height: 3rem;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  color: black;
`;

const GenericAvatar = styled.div`
  background-color: rgb(22, 204, 152);
  display: flex;
  flex-direction: column;
  position: absolute;
  left: 25%;
  top: 89.5%;
  z-index: 1;
  width: 3rem;
  height: 3rem;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  color: white;
`;

class NavigationBar extends Component {
  state = {
    profileModalIsOpen: false,
  };
  // toggle open state of the profile details modal
  toggleProfileModalOpen = () => {
    this.setState({
      profileModalIsOpen: !this.state.profileModalIsOpen,
    });
  };

  render() {
    return (
      <div>
        <Nav variant="permanent" anchor="left">
          <List>
            <StyledListItem>
              <Link to="/">
                <StyledNavItem>
                  <HomeOutlinedIcon
                    fontSize="large"
                    style={{ color: "rgb(22, 204, 152)" }}
                  />
                </StyledNavItem>
              </Link>
            </StyledListItem>
            <ListItem>
              <StyledNavItem>
                <Button onClick={() => this.toggleProfileModalOpen()}>
                  <ProfileIcon fontSize="large" />
                </Button>
              </StyledNavItem>
            </ListItem>
            <ListItem>
              <StyledNavItem>
                <Button onClick={this.props.logoutUser}>
                  <LogOutIcon fontSize="large" />
                </Button>
              </StyledNavItem>
            </ListItem>
          </List>
          {this.props.user.picture !== null ? (
            <UserImage picture={this.props.user.picture} />
          ) : (
            <GenericAvatar>
              <span>{`${this.props.user.firstName
                .split("")[0]
                .toUpperCase()}${this.props.user.lastName
                .split("")[0]
                .toUpperCase()}`}</span>
            </GenericAvatar>
          )}
        </Nav>
        <ProfileModal
          profileModalIsOpen={this.state.profileModalIsOpen}
          toggleProfileModalOpen={this.toggleProfileModalOpen}
        />
      </div>
    );
  }
}

NavigationBar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, { logoutUser })(NavigationBar);
