import {
  UPDATE_BOOTCAMP_REQUEST,
  UPDATE_BOOTCAMP_SUCCESS,
  UPDATE_BOOTCAMP_FAIL,
  UPDATE_BOOTCAMP_RESET,
} from '../actions/types';

const initialState = {
  loading: null,
  success: null,
  error: null,
};

export default function (state = initialState, action) {
  const { payload, type } = action;
  switch (type) {
    case UPDATE_BOOTCAMP_REQUEST:
      return { ...state, loading: true };
    case UPDATE_BOOTCAMP_SUCCESS:
      return { ...state, loading: false, success: true };
    case UPDATE_BOOTCAMP_FAIL:
      return { ...state, loading: false, error: payload };
    case UPDATE_BOOTCAMP_RESET:
      return {
        loading: null,
        success: null,
        error: null,
      };
    default:
      return state;
  }
}
