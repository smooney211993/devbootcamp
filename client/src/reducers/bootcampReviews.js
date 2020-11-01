import {
  BOOTCAMP_REVIEWS_REQUEST,
  BOOTCAMP_REVIEWS_SUCCESS,
  BOOTCAMP_REVIEWS_FAIL,
} from '../actions/types';

const initialState = {
  reviews: [],
  loading: null,
  error: null,
};

export default function (state = initialState, action) {
  const { payload, type } = action;
  switch (type) {
    case BOOTCAMP_REVIEWS_REQUEST:
      return { ...state, loading: true };

    case BOOTCAMP_REVIEWS_SUCCESS:
      return {
        ...state,
        loading: false,
        reviews: payload.data,
      };
    case BOOTCAMP_REVIEWS_FAIL:
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
}
