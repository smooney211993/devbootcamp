import {
  BOOTCAMPS_LIST_REQUEST,
  BOOTCAMPS_LIST_SUCCESS,
  BOOTCAMPS_LIST_FAIL,
  LOAD_USER_REQUEST,
} from '../actions/types';
import { fetchBootcamps } from '../api/bootcamps';

import { call, put, takeEvery } from 'redux-saga/effects';

function* getAllBootCamps(action) {
  const { keyword, pageNumber, budget, rating } = action.payload;
  try {
    const { data } = yield call(
      fetchBootcamps,
      keyword,
      pageNumber,
      budget,
      rating
    );
    yield put({ type: BOOTCAMPS_LIST_SUCCESS, payload: data });
    yield put({ type: LOAD_USER_REQUEST });
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
