import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
} from "./types";
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
