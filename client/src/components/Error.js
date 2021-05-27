import React from "react";
import { Component } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import PropTypes from "prop-types";

// redux
import { clearError } from "../actions/errorActions";
import { connect } from "react-redux";

function Alert(props) {
  return <MuiAlert elevation={6} {...props} />;
}

class ErrorComponent extends Component {
  handleClose = () => {
    this.props.clearError();
  };

  render() {
    return (
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={this.props.error !== null}
        autoHideDuration={6000}
        onClose={this.handleClose}
      >
        <Alert
          severity={this.props.error === "Unauthorized" ? "error" : "info"}
          onClose={this.handleClose}
        >
          {this.props.error}
        </Alert>
      </Snackbar>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error.error,
});

ErrorComponent.propTypes = {
  clearError: PropTypes.func.isRequired,
  error: PropTypes.string,
};

export default connect(mapStateToProps, { clearError })(ErrorComponent);
