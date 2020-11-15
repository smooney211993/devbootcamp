import {
  USER_LOGIN_REQUEST,
  LOAD_USER_REQUEST,
  USER_REGISTER_REQUEST,
  USER_LOGIN_RESET,
  USER_UPDATE_REQUEST,
  USER_UPDATE_RESET,
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

export const userLogOut = () => ({
  type: USER_LOGIN_RESET,
});

export const userUpdate = (formData) => ({
  type: USER_UPDATE_REQUEST,
  payload: {
    formData,
  },
});

export const userUpdateReset = () => ({
  type: USER_UPDATE_RESET,
});
