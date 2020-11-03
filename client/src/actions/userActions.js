import {
  USER_LOGIN_REQUEST,
  LOAD_USER_REQUEST,
  USER_REGISTER_REQUEST,
} from '../actions/types';

export const loadUser = () => ({
  type: LOAD_USER_REQUEST,
});

export const userLogin = (email, password) => ({
  type: USER_LOGIN_REQUEST,
  payload: {
    email,
    password,
  },
});

export const userRegister = (name, email, password) => ({
  type: USER_REGISTER_REQUEST,
  payload: {
    name,
    email,
    password,
  },
});
