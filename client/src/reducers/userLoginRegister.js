import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_RESET,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
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
    case USER_REGISTER_REQUEST:
      return { ...state, loading: true };

    case USER_LOGIN_SUCCESS:
    case USER_REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        token: payload.token,
        isAuthenticated: true,
      };
    case LOAD_USER_SUCCESS:
      return { ...state, user: payload.data, error: null, loading: false };
    case USER_LOGIN_FAIL:
    case USER_REGISTER_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case USER_LOGIN_RESET:
    case LOAD_USER_FAIL:
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