import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  UPDATE_USER_FAIL,
  UPDATE_USER,
} from "../actions/types";

const initialState = {
  isAuthenticated: false,
  loading: false,
  user: {
    id: null,
    firstName: null,
    lastName: null,
    email: null,
    username: null,
  },
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGOUT_SUCCESS:
    case AUTH_ERROR:
      return {
        loading: false,
        isAuthenticated: false,
        user: {
          id: null,
          firstName: null,
          lastName: null,
          email: null,
          username: null,
        },
      };
    case USER_LOADING:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_USER:
      return {
        ...state,
        user: {
          id: action.payload.user._id,
          firstName: action.payload.user.firstName,
          lastName: action.payload.user.lastName,
          email: action.payload.user.email,
          username: action.payload.user.username,
          picture: action.payload.user.picture
            ? action.payload.user.picture
            : null,
        },
      };
    case USER_LOADED:
      return {
        ...state,
        loading: false,
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      return {
        loading: false,
        isAuthenticated: true,
        user: {
          id: action.payload._id,
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
          email: action.payload.email,
          username: action.payload.username,
          picture: action.payload.picture ? action.payload.picture : null,
        },
      };
    default:
      return state;
  }
};

export default authReducer;
