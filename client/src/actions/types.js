export const BOOTCAMPS_LIST_REQUEST = 'BOOTCAMPS_LIST_REQUEST';
export const BOOTCAMPS_LIST_SUCCESS = 'BOOTCAMPS_LIST_SUCCESS';
export const BOOTCAMPS_LIST_FAIL = 'BOOTCAMPS_LIST_FAIL';
export const BOOTCAMPS_LIST_RESET = 'BOOTCAMPS_LIST_RESET';

export const BOOTCAMP_REQUEST = 'BOOTCAMP_REQUEST';
export const BOOTCAMP_SUCCESS = 'BOOTCAMP_SUCCESS';
export const BOOTCAMP_FAIL = 'BOOTCAMP_FAIL';

export const BOOTCAMP_REVIEWS_REQUEST = 'BOOTCAMP_REVIEWS_REQUEST';
export const BOOTCAMP_REVIEWS_SUCCESS = 'BOOT_CAMP_REVIEWS_SUCCESS';
export const BOOTCAMP_REVIEWS_FAIL = 'BOOT_CAMP_REVIEWS_FAIL';

export const USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAIL = 'USER_LOGIN_FAIL';
export const USER_LOGIN_RESET = 'USER_LOGIN_RESET';
export const LOAD_USER_REQUEST = 'LOAD_USER_REQUEST';
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS';
export const LOAD_USER_FAIL = 'LOAD_USER_FAIL';
export const USER_REGISTER_REQUEST = 'USER_REGISTER_REQUEST';
export const USER_REGISTER_SUCCESS = 'USER_REGISTER_SUCCESS';
export const USER_REGISTER_FAIL = 'USER_REGISTER_FAIL';

export const USER_UPDATE_REQUEST = 'USER_UPDATE_REQUEST';
export const USER_UPDATE_SUCCESS = 'USER_UPDATE_SUCCESS';
export const USER_UPDATE_FAIL = 'USER_UPDATE_FAIL';
export const USER_UPDATE_RESET = 'USER_UPDATE_RESET';

export const USER_PASSWORD_UPATE_REQUEST = 'USER_PASSWORD_UPDATE_REQUEST';

export const CREATE_BOOTCAMP_REVIEW_REQUEST = 'CREATE_BOOTCAMP_REVIEW_REQUEST';
export const CREATE_BOOTCAMP_REVIEW_SUCCESS = 'CREATE_BOOTCAMP_REVIEW_SUCCESS';
export const CREATE_BOOTCAMP_REVIEW_FAIL = 'CREATE_BOOTCAMP_REVIEW_FAIL';
export const CREATE_BOOTCAMP_REVIEW_RESET = 'CREATE_BOOTCAMP_REVIEW_RESET';

export const DELETE_BOOTCAMP_REQUEST = 'DELETE_BOOTCAMP_REQUEST';
export const DELETE_BOOTCAMP_SUCCESS = 'DELETE_BOOTCAMP_SUCCESS';
export const DELETE_BOOTCAMP_FAIL = 'DELETE_BOOTCAM_FAIL';
export const DELETE_BOOTCAMP_RESET = 'DELETE_BOOTCAMP_RESET';

export const UPDATE_BOOTCAMP_REQUEST = 'UPDATE_BOOTCAMP_REQUEST';
export const UPDATE_BOOTCAMP_SUCCESS = 'UPDATE_BOOTCAMP_SUCCESS';
export const UPDATE_BOOTCAMP_FAIL = 'UPDATE_BOOTCAMP_FAIL';
export const UPDATE_BOOTCAMP_RESET = 'UPDATE_BOOTCAMP_RESET';

export const SET_ALERT_REQUEST = 'SET_ALERT_REQUEST';
export const SET_ALERT = 'SET_ALERT';
export const REMOVE_ALERT = 'REMOVE_ALERT';
// too much repeated Code at the above

// refactor using higher order

const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const FAIL = 'FAIL';
const RESET = 'RESET';

function createRequestTypes(base) {
  return [REQUEST, SUCCESS, FAIL, RESET].reduce((acc, type) => {
    acc[type] = `${base}_${type}`;
    return acc;
  }, {});
}

export const courseTypes = createRequestTypes('COURSE_LIST');

export const deleteCourseTypes = createRequestTypes('DELETE_COURSE');

export const updateCourseTypes = createRequestTypes('UPDATE_COURSE');

export const getCourseTypes = createRequestTypes('COURSE_');

export const getUserListTypes = createRequestTypes('USER_LIST');

export const deleteUserTypes = createRequestTypes('DELETE_USER');

export const getUserDetailsTypes = createRequestTypes('USER_DETAILS');

export const adminUserUpdateTypes = createRequestTypes('USER_ADMIN_UPDATE');

export const adminCreateUserTypes = createRequestTypes('USER_ADMIN_CREATE');

export const createBootcampTypes = createRequestTypes('BOOTCAMP_ADMIN_CREATE');

export const createCourseTypes = createRequestTypes('COURSE_CREATE');
