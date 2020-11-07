import { all } from 'redux-saga/effects';
import bootcampListSaga from './bootcampListSaga';
import bootcampSaga from './bootcampSaga';
import bootcampReviewSaga from './bootcampReviewsSaga';
import userLoginSaga from './userLoginSaga';
import userRegisterSaga from './userRegisterSaga';
import loadUserSaga from './loadUserSaga';

export default function* rootSaga() {
  yield all([
    bootcampListSaga(),
    bootcampSaga(),
    bootcampReviewSaga(),
    userLoginSaga(),
    userRegisterSaga(),
    loadUserSaga(),
  ]);
}
