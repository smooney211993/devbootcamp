import { createCourseTypes } from '../actions/types';
import { createNewCourse } from '../api/courses';

import { call, put, takeEvery } from 'redux-saga/effects';

function* courseCreate(action) {
  const { bootcampId, formData } = action.payload;
  try {
    const { data } = yield call(createNewCourse, bootcampId, formData);
    yield put({ type: createCourseTypes.SUCCESS, payload: data });
  } catch (error) {
    let message = Array.isArray(error.response.data.message)
      ? error.response.data.message.join(', ')
      : error.response.data.message;
    yield put({
      type: createCourseTypes.FAIL,
      payload: {
        msg: message || error.response.statusText,
        err: error.response.status,
      },
    });
  }
}

export default function* createCourseSaga() {
  yield takeEvery(createCourseTypes.REQUEST, courseCreate);
}
