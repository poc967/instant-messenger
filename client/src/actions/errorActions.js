import { LOGIN_FAIL, REGISTER_FAIL, CLEAR_ERRORS } from "./types";
import axios from "axios";
axios.defaults.withCredentials = true;

export const returnError = (error) => async (dispatch) => {
  dispatch({
    type: LOGIN_FAIL,
    payload: error,
  });
};

export const clearError = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
