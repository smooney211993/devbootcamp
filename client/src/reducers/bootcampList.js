import {
  BOOTCAMPS_LIST_REQUEST,
  BOOTCAMPS_LIST_SUCCESS,
  BOOTCAMPS_LIST_FAIL,
} from '../actions/types';

const initialState = {
  bootcampList: [],
  loading: false,
  error: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case BOOTCAMPS_LIST_REQUEST:
      return { ...state, loading: true };
    case BOOTCAMPS_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        bootcampList: payload,
        error: null,
      };
    case BOOTCAMPS_LIST_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    default:
      return state;
  }
}
