import { CLEAR_ERRORS, LOGIN_FAIL, REGISTER_FAIL } from "../actions/types";

const initialState = {
  code: null,
  error: null,
};

const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_ERRORS:
      return {
        code: null,
        error: null,
      };
    case LOGIN_FAIL:
    case REGISTER_FAIL:
      return {
        code: action.payload.response.status,
        error: action.payload.response.data,
      };
    default:
      return state;
  }
};

export default errorReducer;
