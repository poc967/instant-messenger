import React from "react";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import SendOutlinedIcon from "@material-ui/icons/SendOutlined";
import Input from "@material-ui/core/Input";
import FilledInput from "@material-ui/core/FilledInput";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";

class TextInput extends React.Component {
  state = {
    message: "",
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    return (
      <FormControl fullWidth variant="outlined">
        <InputLabel>Message</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type="text"
          name="message"
          endAdornment={
            <InputAdornment position="end">
              <IconButton edge="end">
                <SendOutlinedIcon
                  style={{
                    color: "rgb(22, 204, 152)",
                  }}
                  onClick={() =>
                    this.props.onMessage(
                      this.state.message,
                      this.props.activeConversationId
                    )
                  }
                />
              </IconButton>
            </InputAdornment>
          }
          onChange={(e) => this.handleChange(e)}
          labelWidth={70}
        />
      </FormControl>
    );
  }
}

export default TextInput;
