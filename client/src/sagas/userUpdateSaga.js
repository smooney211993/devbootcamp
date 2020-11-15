import {
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
} from '../actions/types';

import { call, put, takeEvery } from 'redux-saga/effects';
import { updateUser } from '../api/user';

function* updateUserProfile(action) {
  const { formData } = action.payload;
  try {
    const { data } = yield call(updateUser, formData);
    yield put({ type: USER_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    yield put({
      type: USER_UPDATE_FAIL,
      payload: {
        msg: error.response.statusText,
        err: error.response.status,
      },
    });
  }
}

export default function* updateUserProfileSaga() {
  yield takeEvery(USER_UPDATE_REQUEST, updateUserProfile);
}
