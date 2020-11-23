import {
  USER_LOGIN_REQUEST,
  LOAD_USER_REQUEST,
  USER_REGISTER_REQUEST,
  USER_LOGIN_RESET,
  USER_UPDATE_REQUEST,
  USER_UPDATE_RESET,
  USER_PASSWORD_UPATE_REQUEST,
  getUserListTypes,
  deleteUserTypes,
  getUserDetailsTypes,
  adminUserUpdateTypes,
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

export const userPasswordUpdate = (formData) => ({
  type: USER_PASSWORD_UPATE_REQUEST,
  payload: {
    formData,
  },
});

export const getUsers = (keyword = '', role = '', pageNumber = '') => ({
  type: getUserListTypes.REQUEST,
  payload: {
    keyword,
    role,
    pageNumber,
  },
});

export const deleteUser = (id) => ({
  type: deleteUserTypes.REQUEST,
  payload: {
    id,
  },
});

export const deleteUserReset = () => ({
  type: deleteUserTypes.RESET,
});

export const getUser = (id) => ({
  type: getUserDetailsTypes.REQUEST,
  payload: {
    id,
  },
});

export const adminUserUpdateReset = () => ({
  type: adminUserUpdateTypes.RESET,
});

export const adminUserUpdate = (id, formData) => ({
  type: adminUserUpdateTypes.REQUEST,
  payload: { id, formData },
});
