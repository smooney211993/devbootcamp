import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  LOAD_USER_REQUEST,
} from '../actions/types';
import { registerUser } from '../api/user';
import { call, put, takeEvery } from 'redux-saga/effects';

function* postRegisterUser(action) {
  const { name, email, password } = action.payload;
  try {
    const { data } = yield call(registerUser, name, email, password);
    yield put({ type: USER_REGISTER_SUCCESS, payload: data });
    yield put({ type: LOAD_USER_REQUEST });
  } catch (error) {
    yield put({
      type: USER_REGISTER_FAIL,
      payload: {
        msg: error.response.statusText,
        err: error.response.status,
      },
    });
  }
}

export default function* userRegisterSaga() {
  yield takeEvery(USER_REGISTER_REQUEST, postRegisterUser);
}
