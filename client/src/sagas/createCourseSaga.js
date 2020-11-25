import { createCourseTypes } from '../actions/types';
import { createNewCourse } from '../api/courses';

import { call, put, takeEvery } from 'redux-saga/effects';

function* courseCreate(action) {
  const { bootcampId, formData } = action.payload;
  try {
    const { data } = yield call(createNewCourse, bootcampId, formData);
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
