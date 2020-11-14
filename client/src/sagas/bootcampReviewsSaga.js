import {
  BOOTCAMP_REVIEWS_REQUEST,
  BOOTCAMP_REVIEWS_SUCCESS,
  BOOTCAMP_REVIEWS_FAIL,
} from '../actions/types';
import { fetchBootcampReviewById } from '../api/bootcamps';
import { call, put, takeEvery } from 'redux-saga/effects';

function* getBootcampReview(action) {
  const { id } = action.payload;
  try {
    const { data } = yield call(fetchBootcampReviewById, id);
    yield put({ type: BOOTCAMP_REVIEWS_SUCCESS, payload: data });
  } catch (error) {
    yield put({
      type: BOOTCAMP_REVIEWS_FAIL,
      payload: {
        msg: error.response.statusText,
        err: error.response.status,
      },
    });
  }
}

export default function* bootcampReviewSage() {
  yield takeEvery(BOOTCAMP_REVIEWS_REQUEST, getBootcampReview);
}
