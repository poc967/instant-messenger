import React from "react";
import IconButton from "@material-ui/core/IconButton";
import SendOutlinedIcon from "@material-ui/icons/SendOutlined";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
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

  clearInputOnClick = async () => {
    await this.setState({
      message: "",
    });
  };

  bundleCreateMessageAndClear = () => {
    this.props.onMessage(this.state.message, this.props.activeConversationId);

    this.clearInputOnClick();
  };

  render() {
    return (
      <FormControl fullWidth variant="outlined">
        <InputLabel>Message</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type="text"
          name="message"
          value={this.state.message}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                edge="end"
                onClick={() => this.bundleCreateMessageAndClear()}
              >
                <SendOutlinedIcon
                  style={{
                    color: "rgb(22, 204, 152)",
                  }}
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
