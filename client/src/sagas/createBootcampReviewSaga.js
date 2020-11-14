import {
  CREATE_BOOTCAMP_REVIEW_REQUEST,
  CREATE_BOOTCAMP_REVIEW_SUCCESS,
  CREATE_BOOTCAMP_REVIEW_FAIL,
} from '../actions/types';

import {
  postBootcampReview,
  postBootcampReviewWithApiCaller,
} from '../api/bootcamps';
import { call, put, takeLatest } from 'redux-saga/effects';

const authToken = localStorage.getItem('token');

function* addBootcampReview(action) {
  const { id, formData } = action.payload;
  try {
    const newReview = yield call(
      postBootcampReviewWithApiCaller,
      id,
      formData,
      authToken
    );
    yield put({ type: CREATE_BOOTCAMP_REVIEW_SUCCESS, payload: newReview });
  } catch (error) {
    yield put({
      type: CREATE_BOOTCAMP_REVIEW_FAIL,
      payload: {
        msg: error.response.statusText,
        err: error.response.status,
      },
    });
  }
}

export default function* addBootcampReviewSaga() {
  yield takeLatest(CREATE_BOOTCAMP_REVIEW_REQUEST, addBootcampReview);
}
