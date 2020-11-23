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
import courseListSaga from './coursesListSaga';
import deleteCourseSaga from './deleteCourseSaga';
import getCourseSaga from './getCourseSaga';
import updateCourseSaga from './updateCourseSaga';
import userListSaga from './userListSaga';
import deleteUserSaga from './deleteUserSaga';
import userDetailsSaga from './userDetailsSaga';
import userDetailsUpdateSaga from './userDetailsUpdateSaga';
import createUserSaga from './createUserSaga';

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
    courseListSaga(),
    deleteCourseSaga(),
    getCourseSaga(),
    updateCourseSaga(),
    userListSaga(),
    deleteUserSaga(),
    userDetailsSaga(),
    userDetailsUpdateSaga(),
    createUserSaga(),
  ]);
}
