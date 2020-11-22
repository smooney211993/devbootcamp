import { updateCourseTypes } from '../actions/types';
import { updateCourseById } from '../api/courses';
import { updateCourseTypes } from '../actions/types';

import { call, put, takeLatest } from 'redux-saga/effects';

function* updateCourse(action) {
  const { id, formData } = action.payload;
  try {
    yield call(updateCourseById, id, formData);
    yield put({ type: updateCourseTypes.SUCCESS });
  } catch (error) {
    yield put({
      type: updateCourseTypes.FAIL,
      payload: {
        msg: error.response.statusText,
        err: error.response.status,
      },
    });
  }
}

export default function* updateCourseSaga() {
  yield takeLatest(updateCourseTypes.REQUEST, updateCourse);
}
