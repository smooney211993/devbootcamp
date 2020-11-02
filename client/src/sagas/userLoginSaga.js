import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
} from '../actions/types';
import { fetchUserToken } from '../api/user';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';

function* getUserAccessToken(action) {
  const { email, password } = action.payload;
  try {
    const token = yield call(fetchUserToken, email, password);
    yield put({ type: USER_LOGIN_SUCCESS, payload: token });
  } catch (error) {
    yield put({
      type: USER_LOGIN_FAIL,
      payload: { msg: error.response.statusText, err: error.response.status },
    });
  }
}

export default function* userLoginSaga() {
  yield takeEvery(USER_LOGIN_REQUEST, getUserAccessToken);
}
