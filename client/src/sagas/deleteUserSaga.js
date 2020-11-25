import { deleteUserTypes } from '../actions/types';
import { deleteUserAsAdmin } from '../api/user';

import { call, put, takeLatest } from 'redux-saga/effects';

function* deleteUserById(action) {
  const { id } = action.payload;
  try {
    yield call(deleteUserAsAdmin, id);
    yield put({ type: deleteUserTypes.SUCCESS });
  } catch (error) {
    let message = Array.isArray(error.response.data.message)
      ? error.response.data.message.join(', ')
      : error.response.data.message;
    yield put({
      type: deleteUserTypes.FAIL,
      payload: {
        msg: message || error.response.statusText,
        err: error.response.status,
      },
    });
  }
}

export default function* deleteUserSaga() {
  yield takeLatest(deleteUserTypes.REQUEST, deleteUserById);
}
