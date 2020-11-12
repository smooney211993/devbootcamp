import {
  DELETE_BOOTCAMP_REQUEST,
  DELETE_BOOTCAMP_SUCCESS,
  DELETE_BOOTCAMP_FAIL,
  DELETE_BOOTCAMP_RESET,
} from '../actions/types';

const initialState = {
  loading: null,
  success: null,
  error: null,
};

export default function (state = initialState, action) {
  const { payload, type } = action;
  switch (type) {
    case DELETE_BOOTCAMP_REQUEST:
      return { ...state, loading: true };
    case DELETE_BOOTCAMP_SUCCESS:
      return { ...state, loading: false, success: true };
    case DELETE_BOOTCAMP_FAIL:
      return { ...state, loading: false, error: payload };
    case DELETE_BOOTCAMP_RESET:
      return { loading: null, success: null, error: null };
    default:
      return state;
  }
}
