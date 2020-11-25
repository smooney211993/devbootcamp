import { getUserListTypes } from '../actions/types';
import { getUsersAsAdmin } from '../api/user';

import { call, put, takeEvery } from 'redux-saga/effects';

function* fetchUsers(action) {
  const { keyword, role, pageNumber } = action.payload;
  try {
    const { data } = yield call(getUsersAsAdmin, keyword, role, pageNumber);
    yield put({
      type: getUserListTypes.SUCCESS,
      payload: data,
    });
  } catch (error) {
    let message = Array.isArray(error.response.data.message)
      ? error.response.data.message.join(', ')
      : error.response.data.message;
    yield put({
      type: getUserListTypes.FAIL,
      payload: {
        msg: message || error.response.statusText,
        err: error.response.status,
      },
    });
  }
}

export default function* userListSaga() {
  yield takeEvery(getUserListTypes.REQUEST, fetchUsers);
}
