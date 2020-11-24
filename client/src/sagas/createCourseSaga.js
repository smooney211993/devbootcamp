import { createCourseTypes } from '../actions/types';
import { createNewCourse } from '../api/courses';

import { call, put, takeEvery } from 'redux-saga/effects';
import { createCourse } from '../actions/courseActions';

function* courseCreate(action) {
  const { formData } = action.payload;
  try {
    const { data } = yield call(createNewCourse, formData);
    yield put({ type: createCourseTypes.SUCCESS, payload: data });
  } catch (error) {
    yield put({
      type: createCourseTypes.FAIL,
      payload: {
        msg: error.response.statusText,
        err: error.response.status,
      },
    });
  }
}

export default function* createCourseSaga() {
  yield takeEvery(createCourseTypes.REQUEST, courseCreate);
}
