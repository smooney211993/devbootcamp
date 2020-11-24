import { createBootcampTypes } from '../actions/types';
import { creatNewBootcamp } from '../api/bootcamps';
import { call, put, takeEvery } from 'redux-saga/effects';

function* bootcampCreate(action) {
  const { formData } = action.payload;
  try {
    const { data } = yield call(creatNewBootcamp, formData);
    yield put({ type: createBootcampTypes.SUCCESS, payload: data });
  } catch (error) {
    yield put({
      type: createBootcampTypes.FAIL,
      payload: {
        msg: error.response.statusText,
        err: error.response.status,
      },
    });
  }
}

export default function* bootcampCreateSaga() {
  yield takeEvery(createBootcampTypes.REQUEST, bootcampCreate);
}
