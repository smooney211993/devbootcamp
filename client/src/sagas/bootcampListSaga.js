import {
  BOOTCAMPS_LIST_REQUEST,
  BOOTCAMPS_LIST_SUCCESS,
  BOOTCAMPS_LIST_FAIL,
} from '../actions/types';
import { fetchBootcamps } from '../api/bootcamps';

import { call, put, takeEvery } from 'redux-saga/effects';

function* getAllBootCamps(action) {
  const { keyword, pageNumber } = action.payload;
  try {
    const bootcamps = yield call(fetchBootcamps, keyword, pageNumber);
    yield put({ type: BOOTCAMPS_LIST_SUCCESS, payload: bootcamps });
  } catch (error) {
    yield put({
      type: BOOTCAMPS_LIST_FAIL,
      payload: {
        msg: error.response.statusText,
        err: error.response.status,
      },
    });
  }
}

export default function* bootcampListSaga() {
  yield takeEvery(BOOTCAMPS_LIST_REQUEST, getAllBootCamps);
}
