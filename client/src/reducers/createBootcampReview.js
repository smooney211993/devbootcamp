import {
  CREATE_BOOTCAMP_REVIEW_REQUEST,
  CREATE_BOOTCAMP_REVIEW_SUCCESS,
  CREATE_BOOTCAMP_REVIEW_FAIL,
  CREATE_BOOTCAMP_REVIEW_RESET,
} from '../actions/types';

const initialState = {
  loading: null,
  success: null,
  error: null,
  review: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case CREATE_BOOTCAMP_REVIEW_REQUEST:
      return { ...state, loading: true };

    case CREATE_BOOTCAMP_REVIEW_SUCCESS:
      return { ...state, loading: false, review: payload.data, success: true };
    case CREATE_BOOTCAMP_REVIEW_FAIL:
      return { ...state, loading: false, error: payload };
    case CREATE_BOOTCAMP_REVIEW_RESET:
      return {
        loading: null,
        success: null,
        error: null,
        review: {},
      };
    default:
      return state;
  }
}
