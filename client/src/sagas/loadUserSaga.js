import {
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
} from '../actions/types';
import { fetchUser } from '../api/user';

import { call, put, takeEvery } from 'redux-saga/effects';

function* getUser(action) {
  try {
    const { data } = yield call(fetchUser);
    yield put({ type: LOAD_USER_SUCCESS, payload: data });
  } catch (error) {
    yield put({
      type: LOAD_USER_FAIL,
    });
  }
}

export default function* loadUserSaga() {
  yield takeEvery(LOAD_USER_REQUEST, getUser);
}
