import { all, fork } from 'redux-saga/effects';
import bootcampListSaga from './bootcampListSaga';
import bootcampSaga from './bootcampSaga';
import bootcampReviewSaga from './bootcampReviewsSaga';
import userLoginSaga from './userLoginSaga';
import userRegisterSaga from './userRegisterSaga';
import loadUserSaga from './loadUserSaga';

export default function* rootSaga() {
  yield all([
    fork(bootcampListSaga),
    fork(bootcampSaga),
    fork(bootcampReviewSaga),
    fork(userLoginSaga),
    fork(userRegisterSaga),
    fork(loadUserSaga),
  ]);
}
