import {
  BOOTCAMP_FAIL,
  BOOTCAMP_REQUEST,
  BOOTCAMP_SUCCESS,
} from '../actions/types';
import { fetchBootcampById } from '../api/bootcamps';

import { call, put, takeEvery } from 'redux-saga/effects';

function* getBootcampById(action) {
  const { id } = action.payload;
  try {
    const bootcamp = yield call(fetchBootcampById, id);
    yield put({ type: BOOTCAMP_SUCCESS, payload: bootcamp });
  } catch (error) {
    yield put({
      type: BOOTCAMP_FAIL,
      payload: {
        msg: error.response.statusText,
        err: error.response.status,
      },
    });
  }
}

export default function* bootcampSaga() {
  yield takeEvery(BOOTCAMP_REQUEST, getBootcampById);
}
