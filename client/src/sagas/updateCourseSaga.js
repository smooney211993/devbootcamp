import { updateCourseTypes } from '../actions/types';
import { updateCourseById } from '../api/courses';

import { call, put, takeLatest } from 'redux-saga/effects';

function* courseUpdate(action) {
  const { id, formData } = action.payload;
  try {
    yield call(updateCourseById, id, formData);
    yield put({ type: updateCourseTypes.SUCCESS });
  } catch (error) {
    let message = Array.isArray(error.response.data.message)
      ? error.response.data.message.join(', ')
      : error.response.data.message;
    yield put({
      type: updateCourseTypes.FAIL,
      payload: {
        msg: message || error.response.statusText,
        err: error.response.status,
      },
    });
  }
}

export default function* updateCourseSaga() {
  yield takeLatest(updateCourseTypes.REQUEST, courseUpdate);
}
