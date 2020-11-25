import { getUserDetailsTypes } from '../actions/types';

import { getUserAsAdmin } from '../api/user';

import { call, put, takeEvery } from 'redux-saga/effects';

function* fetchUser(action) {
  const { id } = action.payload;
  try {
    const { data } = yield call(getUserAsAdmin, id);
    yield put({ type: getUserDetailsTypes.SUCCESS, payload: data });
  } catch (error) {
    let message = Array.isArray(error.response.data.message)
      ? error.response.data.message.join(', ')
      : error.response.data.message;
    yield put({
      type: getUserDetailsTypes.FAIL,
      payload: {
        msg: message || error.response.statusText,
        err: error.response.status,
      },
    });
  }
}

export default function* userDetailsSaga() {
  yield takeEvery(getUserDetailsTypes.REQUEST, fetchUser);
}
