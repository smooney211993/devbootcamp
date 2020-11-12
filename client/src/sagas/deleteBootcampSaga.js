import {
  DELETE_BOOTCAMP_REQUEST,
  DELETE_BOOTCAMP_SUCCESS,
  DELETE_BOOTCAMP_FAIL,
} from '../actions/types';

import { deleteBootcamp } from '../api/bootcamps';

import { call, put, takeLatest } from 'redux-saga/effects';

function* deleteBootcampAsAdmin(action) {
  const { id } = action.payload;
  try {
    yield call(deleteBootcamp, id);
    yield put({ type: DELETE_BOOTCAMP_SUCCESS });
  } catch (error) {
    yield {
      type: DELETE_BOOTCAMP_FAIL,
      payload: {
        msg: error.response.statusText,
        err: error.response.status,
      },
    };
  }
}

export default function* deleteBootcampSaga() {
  yield takeLatest(DELETE_BOOTCAMP_REQUEST, deleteBootcampAsAdmin);
}
