import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_RESET,
} from '../actions/types';

const initialState = {
  user: {},
  token: localStorage.getItem('token'),
  error: null,
  loading: null,
  isAuthenticated: false,
};

export default function (state = initialState, action) {
  const { payload, type } = action;
  switch (type) {
    case USER_LOGIN_REQUEST:
      return { ...state, loading: true };

    case USER_LOGIN_SUCCESS:
      return { ...state, loading: false, token: payload.token };
    case USER_LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case USER_LOGIN_RESET:
      return {
        user: {},
        error: null,
        loading: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
}
