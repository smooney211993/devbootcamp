import { getCourseTypes } from '../actions/types';
import { getCourseById } from '../api/courses';

import { call, put, takeEvery } from 'redux-saga/effects';

function* fetchCourse(action) {
  const { id } = action.payload;
  try {
    const { data } = yield call(getCourseById, id);
    yield put({ type: getCourseTypes.SUCCESS, payload: data });
  } catch (error) {
    yield put({
      type: getCourseTypes.FAIL,
      payload: {
        msg: error.response.statusText,
        err: error.response.status,
      },
    });
  }
}

export default function* getCourseSaga() {
  yield takeEvery(getCourseTypes.REQUEST, fetchCourse);
}
