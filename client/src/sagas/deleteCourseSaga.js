import { deleteCourseTypes } from '../actions/types';
import { call, put, takeLatest } from 'redux-saga/effects';
import { deleteCourseByIdAsAdmin } from '../api/courses';

function* deleteCourseById(action) {
  const { id } = action.payload;
  try {
    yield call(deleteCourseByIdAsAdmin, id);
    yield put({ type: deleteCourseTypes.SUCCESS });
  } catch (error) {
    yield put({
      type: deleteCourseTypes.FAIL,
      payload: {
        msg: error.response.statusText,
        err: error.response.status,
      },
    });
  }
}

export default function* deleteCourseSaga() {
  yield takeLatest(deleteCourseTypes.REQUEST, deleteCourseById);
}
