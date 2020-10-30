import {
  BOOTCAMP_REQUEST,
  BOOTCAMP_SUCCESS,
  BOOTCAMP_FAIL,
} from '../actions/types';

const initialState = {
  bootcamp: {},
  loading: null,
  error: null,
};

export default function (state = initialState, action) {
  const { payload, type } = action;
  switch (type) {
    case BOOTCAMP_REQUEST:
      return { ...state, loading: true };
    case BOOTCAMP_SUCCESS:
      return { ...state, loading: false, bootcamp: payload };
    case BOOTCAMP_FAIL:
      return {
        ...state,
        loading: false,
        bootcamp: {},
        error: payload,
      };
    default:
      return state;
  }
}
