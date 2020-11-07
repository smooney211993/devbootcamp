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
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case CREATE_BOOTCAMP_REVIEW_REQUEST:
      return { ...state, loading: true };

    case CREATE_BOOTCAMP_REVIEW_SUCCESS:
      return { ...state, loading: false };
    case CREATE_BOOTCAMP_REVIEW_FAIL:
      return { ...state, loading: false, error: payload };

    default:
      return state;
  }
}
