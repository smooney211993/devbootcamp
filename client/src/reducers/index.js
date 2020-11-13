import { combineReducers } from 'redux';
import bootcampList from './bootcampList';
import bootcamp from './bootcamp';
import bootcampReviews from './bootcampReviews';
import userLoginRegister from './userLoginRegister';
import userUpdate from './userUpdate';
import createBootcampReview from './createBootcampReview';
import deleteBootcamp from './deleteBootcamp';
import updateBootcamp from './updatebootcamp';

export default combineReducers({
  bootcampList,
  bootcamp,
  bootcampReviews,
  userLoginRegister,
  createBootcampReview,
  deleteBootcamp,
  updateBootcamp,
  userUpdate,
});
