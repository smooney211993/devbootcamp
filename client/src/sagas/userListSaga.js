import { getUserListTypes } from '../actions/types';
import { getUserAsAdmin } from '../api/user';

import { call, put, takeEvery } from 'redux-saga/effects';

function* fetchUsers(action) {
  const { keyword, roles, pageNumber } = action.payload;
  try {
    const { data } = yield call(getUserAsAdmin, keyword, roles, pageNumber);
    yield put({
      type: getUserListTypes.SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({
      type: getUserListTypes.FAIL,
      payload: {
        msg: error.response.statusText,
        err: error.response.status,
      },
    });
  }
}

export default function* userListSaga() {
  yield takeEvery(getUserListTypes.REQUEST, fetchUsers);
}
