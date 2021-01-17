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
  render() {
    return (
      <FormControl fullWidth variant="outlined" multiline rows={4}>
        <InputLabel>Message</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type="text"
          endAdornment={
            <InputAdornment position="end">
              <IconButton edge="end">
                <SendOutlinedIcon
                  style={{
                    color: "rgb(22, 204, 152)",
                  }}
                />
              </IconButton>
            </InputAdornment>
          }
          labelWidth={70}
        />
      </FormControl>
    );
  }
}

export default TextInput;
