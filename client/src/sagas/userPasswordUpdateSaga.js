import { call, put, takeEvery } from 'redux-saga/effects';

import { userPasswordUpdate } from '../api/user';

function* updateUserPassword(action) {
  const { formData } = action.payload;
}
