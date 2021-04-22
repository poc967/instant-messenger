import { FETCH_ERRORS, CLEAR_ERRORS } from "./types";

export const returnError = (error) => async (dispatch) => {
  dispatch({
    type: FETCH_ERRORS,
    payload: error,
  });
};

export const clearError = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
