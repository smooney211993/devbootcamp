import { combineReducers } from 'redux';
import bootcampList from './bootcampList';
import bootcamp from './bootcamp';
import bootcampReviews from './bootcampReviews';
import userLoginRegister from './userLoginRegister';
import userUpdate from './userUpdate';
import createBootcampReview from './createBootcampReview';
import deleteBootcamp from './deleteBootcamp';
import updateBootcamp from './updatebootcamp';
import courseList from './courseList';
import deleteCourse from './deleteCourse';
import course from './course';
import userList from './userList';
import userDetails from './UserDetails';
import userCreate from './UserCreate';

import {
  updateCourseTypes,
  deleteUserTypes,
  adminUserUpdateTypes,
} from '../actions/types';

// higher order reducer creator
const createReducer = (typeObject) => (
  state = { loading: null, success: null, error: null },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case typeObject.REQUEST:
      return { ...state, loading: true };
    case typeObject.SUCCESS:
      return { ...state, loading: false, error: null, success: true };

    case typeObject.FAIL:
      return { ...state, loading: false, success: false, error: payload };
    case typeObject.RESET:
      return {
        loading: null,
        success: null,
        error: null,
      };

    default:
      return state;
  }
};

const updateCourse = createReducer(updateCourseTypes);
const deleteUser = createReducer(deleteUserTypes);
const adminUserUpdate = createReducer(adminUserUpdateTypes);

export default combineReducers({
  bootcampList,
  bootcamp,
  bootcampReviews,
  userLoginRegister,
  createBootcampReview,
  deleteBootcamp,
  updateBootcamp,
  userUpdate,
  courseList,
  deleteCourse,
  updateCourse,
  course,
  userList,
  deleteUser,
  userDetails,
  adminUserUpdate,
  userCreate,
});
