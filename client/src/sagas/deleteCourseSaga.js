import { deleteCourseTypes } from '../actions/types';
import { call, put, takeLatest } from 'redux-saga/effects';
import { deleteCourseByIdAsAdmin } from '../api/courses';

function* deleteCourseById(action) {
  const { id } = action.payload;
  try {
    yield call(deleteCourseByIdAsAdmin, id);
    yield put({ type: deleteCourseTypes.SUCCESS });
  } catch (error) {
    let message = Array.isArray(error.response.data.message)
      ? error.response.data.message.join(', ')
      : error.response.data.message;
    yield put({
      type: deleteCourseTypes.FAIL,
      payload: {
        msg: message || error.response.statusText,
        err: error.response.status,
      },
    });
  }
}

export default function* deleteCourseSaga() {
  yield takeLatest(deleteCourseTypes.REQUEST, deleteCourseById);
}
