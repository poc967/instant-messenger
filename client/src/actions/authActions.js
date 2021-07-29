import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  UPDATE_USER,
  UPDATE_USER_FAIL,
} from "./types";
import { returnError } from "./errorActions";
import axios from "axios";
import socket from "../socket";

axios.defaults.withCredentials = true;

export const getUser = () => async (dispatch, getState) => {
  dispatch(setUserLoading());

  try {
    const response = await axios.get(`${process.env.REACT_APP_base_url}/user`);
    dispatch({
      type: USER_LOADED,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
    });
    socket.disconnect();
  }
};

export const authenticateUser = (username, password) => async (dispatch) => {
  dispatch(setUserLoading());

  try {
    const response = await axios.post(
      `${process.env.REACT_APP_base_url}/user/login`,
      {
        username,
        password,
      }
    );

    dispatch({
      type: LOGIN_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
    });
    dispatch(returnError(error));
    socket.disconnect();
  }
};

export const logoutUser = () => async (dispatch) => {
  dispatch(setUserLoading());

  try {
    await axios.get(`${process.env.REACT_APP_base_url}/user/logout`);
    dispatch({
      type: LOGOUT_SUCCESS,
    });
    socket.disconnect();
  } catch (error) {}
};

export const setUserLoading = () => {
  return {
    type: USER_LOADING,
  };
};

export const registerUser =
  (username, password, email, firstName, lastName) => async (dispatch) => {
    dispatch(setUserLoading());

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_base_url}/user`,
        {
          username,
          password,
          email,
          firstName,
          lastName,
        }
      );
      dispatch({
        type: REGISTER_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: AUTH_ERROR,
      });
      dispatch(returnError(error));
      socket.disconnect();
    }
  };

export const updateUser = (data) => async (dispatch) => {
  dispatch(setUserLoading());

  const response = await axios.put(
    `${process.env.REACT_APP_base_url}/user/edit-user`,
    data
  );
  if (response.status === 200) {
    dispatch({
      type: UPDATE_USER,
      payload: response.data,
    });
  } else {
    dispatch({
      type: UPDATE_USER_FAIL,
    });
    dispatch(returnError(response.data));
  }
};
