import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from "./types";
import { returnError } from "./errorActions";
import axios from "axios";
axios.defaults.withCredentials = true;

export const getUser = () => async (dispatch, getState) => {
  dispatch(setUserLoading());

  try {
    const response = await axios.get("http://localhost:8080/user");
    dispatch({
      type: USER_LOADED,
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const authenticateUser = (username, password) => async (dispatch) => {
  dispatch(setUserLoading());

  try {
    const response = await axios.post("http://localhost:8080/user/login", {
      username,
      password,
    });

    dispatch({
      type: LOGIN_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
    });
    dispatch(returnError(error));
  }
};

export const logoutUser = () => async (dispatch) => {
  dispatch(setUserLoading());

  try {
    const response = await axios.get("http://localhost:8080/user/logout");
    dispatch({
      type: LOGOUT_SUCCESS,
    });
  } catch (error) {
    console.log(error);
  }
};

export const setUserLoading = () => {
  return {
    type: USER_LOADING,
  };
};

export const registerUser = (
  username,
  password,
  email,
  firstName,
  lastName
) => async (dispatch) => {
  dispatch(setUserLoading());

  try {
    const response = await axios.post("http://localhost:8080/user", {
      username,
      password,
      email,
      firstName,
      lastName,
    });
    console.log(response);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    console.error(error);
  }
};
