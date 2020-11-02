import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
} from '../actions/types';
import { fetchUserToken, fetchUser } from '../api/user';
import { call, put, takeEvery } from 'redux-saga/effects';

function* getUserAccessToken(action) {
  const { email, password } = action.payload;
  try {
    const token = yield call(fetchUserToken, email, password);
    yield put({ USER_LOGIN_SUCCESS, payload: token });
  } catch (error) {
    yield put({
      USER_LOGIN_FAIL,
      payload: { msg: error.response.statusText, err: error.response.status },
    });
  }
}

export default function* userLoginSaga() {
  yield takeEvery(USER_LOGIN_REQUEST, getUserAccessToken);
}
