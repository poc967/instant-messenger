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

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  margin: 0.5rem;
  background-color: white;
  border-radius: 15px;
`;

class TextInput extends React.Component {
  render() {
    return (
      //   <Wrapper>
      <FormControl
        fullWidth
        variant="outlined"
        multiline
        rows={4}
        style={{ backgroundColor: "white" }}
      >
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
      //   </Wrapper>
    );
  }
}

export default TextInput;
