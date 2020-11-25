import { courseTypes } from '../actions/types';
import { getAllCoursesAsAdmin } from '../api/courses';
import { call, put, takeEvery } from 'redux-saga/effects';

function* getAllCourses(action) {
  const { keyword, pageNumber, budget } = action.payload;
  try {
    const { data } = yield call(
      getAllCoursesAsAdmin,
      keyword,
      budget,
      pageNumber
    );

    yield put({ type: courseTypes.SUCCESS, payload: data });
  } catch (error) {
    let message = Array.isArray(error.response.data.message)
      ? error.response.data.message.join(', ')
      : error.response.data.message;
    yield put({
      type: courseTypes.FAIL,
      payload: {
        msg: message || error.response.statusText,
        err: error.response.status,
      },
    });
  }
}

export default function* getAllCoursesSaga() {
  yield takeEvery(courseTypes.REQUEST, getAllCourses);
}
