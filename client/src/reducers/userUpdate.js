import {
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_RESET,
} from '../actions/types';

const initialState = {
  loading: null,
  success: null,
  error: null,
  updateUser: {},
};

export default function (state = initialState, action) {
  const { payload, type } = action;
  switch (type) {
    case USER_UPDATE_REQUEST:
      return { ...state, loading: true };

    case USER_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        updateUser: payload.data,
      };
    case USER_UPDATE_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case USER_UPDATE_RESET:
      return {
        loading: null,
        success: null,
        error: null,
      };

    default:
      return state;
  }
}
