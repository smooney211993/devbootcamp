import {
  UPDATE_BOOTCAMP_REQUEST,
  UPDATE_BOOTCAMP_SUCCESS,
  UPDATE_BOOTCAMP_FAIL,
} from '../actions/types';

import { updateBootcampById } from '../api/bootcamps';

import { call, put, takeEvery } from 'redux-saga/effects';

function* bootcampUpdate(action) {
  const { formData, id } = action.payload;
  try {
    yield call(updateBootcampById, id, formData);
    yield put({ type: UPDATE_BOOTCAMP_SUCCESS });
  } catch (error) {
    let message = Array.isArray(error.response.data.message)
      ? error.response.data.message.join(', ')
      : error.response.data.message;
    yield put({
      type: UPDATE_BOOTCAMP_FAIL,
      payload: {
        msg: message || error.response.statusText,
        err: error.response.status,
      },
    });
  }
}

export default function* bootcampUpdateSaga() {
  yield takeEvery(UPDATE_BOOTCAMP_REQUEST, bootcampUpdate);
}
