import { all } from 'redux-saga/effects';
import bootcampListSaga from './bootcamp';

export default function* rootSaga() {
  yield all([bootcampListSaga()]);
}
