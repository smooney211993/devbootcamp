import { all } from 'redux-saga/effects';
import bootcampListSaga from './bootcampListSaga';
import bootcampSaga from './bootcampSaga';
import bootcampReviewSaga from './bootcampReviewsSaga';
import userLoginSaga from './userLoginSaga';
import userRegisterSaga from './userRegisterSaga';
import userUpdateSaga from './userUpdateSaga';
import loadUserSaga from './loadUserSaga';
import createBootCampReviewSaga from './createBootcampReviewSaga';
import deleteBootcampSaga from './deleteBootcampSaga';
import bootcampUpdateSaga from './bootcampUpdateSaga';

export default function* rootSaga() {
  yield all([
    bootcampListSaga(),
    bootcampSaga(),
    bootcampReviewSaga(),
    userLoginSaga(),
    userRegisterSaga(),
    loadUserSaga(),
    createBootCampReviewSaga(),
    deleteBootcampSaga(),
    bootcampUpdateSaga(),
    userUpdateSaga(),
  ]);
}
