import {
  BOOTCAMPS_LIST_REQUEST,
  BOOTCAMPS_LIST_SUCCESS,
  BOOTCAMPS_LIST_FAIL,
  BOOTCAMPS_LIST_RESET,
} from '../actions/types';

const initialState = {
  bootcampList: [],
  loading: false,
  error: null,
  page: null,
  pages: null,
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
        bootcampList: payload.data,
        error: null,
        page: payload.page,
        pages: payload.pages,
      };
    case BOOTCAMPS_LIST_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case BOOTCAMPS_LIST_RESET:
      return {
        bootcampList: [],
        loading: false,
        error: null,
      };

    default:
      return state;
  }
}
