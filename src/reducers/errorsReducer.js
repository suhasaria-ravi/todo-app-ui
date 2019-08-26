import { GET_ERRORS,DELETE_ERROR_TASK } from "../actions/types";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return {
        ...state,
        errors: action.payload};

    case DELETE_ERROR_TASK:
        return {
          ...state,
          errors: action.payload
        };

    default:
      return state;
  }
}