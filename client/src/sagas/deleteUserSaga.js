import { deleteUserTypes } from '../actions/types';
import { deleteUserAsAdmin } from '../api/user';

import { call, put, takeLatest } from 'redux-saga/effects';

function* deleteUserById(action) {
  const { id } = action.payload;
  try {
    yield call(deleteUserAsAdmin, id);
    yield put({ type: deleteUserTypes.SUCCESS });
  } catch (error) {
    yield put({
      type: deleteUserTypes.FAIL,
      payload: {
        msg: error.response.statusText,
        err: error.response.status,
      },
    });
  }
}

export default function* deleteUserSaga() {
  yield takeLatest(deleteUserTypes.REQUEST, deleteUserById);
}
