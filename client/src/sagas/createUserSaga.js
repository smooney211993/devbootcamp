import { adminCreateUserTypes } from '../actions/types';
import { createUserAsAdmin } from '../api/user';

import { call, put, takeLatest } from 'redux-saga/effects';

function* createUser(action) {
  const { formData } = action.payload;
  try {
    const { data } = yield call(createUserAsAdmin, formData);
    yield put({ type: adminCreateUserTypes.SUCCESS, payload: data });
  } catch (error) {
    yield put({
      type: adminCreateUserTypes.FAIL,
      payload: {
        msg: error.response.statusText,
        err: error.response.status,
      },
    });
  }
}

export default function* createUserSaga() {
  yield takeLatest(adminCreateUserTypes.REQUEST, createUser);
}
