import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import PropTypes from "prop-types";

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

const StyledListItem = styled(ListItem)``;

class NavigationBar extends Component {
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
              <Link to="/profile">
                <StyledNavItem>
                  <PersonOutlineOutlinedIcon
                    fontSize="large"
                    style={{ color: "rgb(22, 204, 152)" }}
                  />
                </StyledNavItem>
              </Link>
            </ListItem>
            <ListItem>
              <StyledNavItem>
                <button onClick={this.props.logoutUser}>
                  <ExitToAppOutlinedIcon
                    fontSize="large"
                    style={{ color: "rgb(22, 204, 152)" }}
                  />
                </button>
              </StyledNavItem>
            </ListItem>
          </List>
        </Nav>
      </div>
    );
  }
}

NavigationBar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
};

export default connect(null, { logoutUser })(NavigationBar);
