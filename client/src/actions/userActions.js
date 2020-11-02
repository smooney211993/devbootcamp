import { USER_LOGIN_REQUEST } from '../actions/types';
export const userLogin = (email, password) => ({
  type: USER_LOGIN_REQUEST,
  payload: {
    email,
    password,
  },
});
