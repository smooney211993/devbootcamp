import { adminUserUpdateTypes } from '../actions/types';
import { updateUserAsAdmin } from '../api/user';

import { call, put, takeLatest } from 'redux-saga/effects';

function* adminUserUpdate(action) {
  const { id, formData } = action.payload;
  try {
    yield call(updateUserAsAdmin, id, formData);
    yield put({ type: adminUserUpdateTypes.SUCCESS });
  } catch (error) {
    yield put({
      type: adminUserUpdateTypes.FAIL,
      payload: {
        msg: error.response.statusText,
        err: error.response.status,
      },
    });
  }
}

export default function* userDetailsUpdateSaga() {
  yield takeLatest(adminUserUpdateTypes.REQUEST, adminUserUpdate);
}
