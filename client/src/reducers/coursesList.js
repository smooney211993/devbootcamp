import { courseTypes } from '../actions/types';

const initialState = {
  loading: null,
  courses: [],
  error: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case courseTypes.REQUEST:
      return { ...state, loading: true };
    case courseTypes.SUCCESS:
      return { ...state, loading: false, courses: payload.data };
    case courseTypes.FAIL:
      return { ...state, loading: false, error: payload };

    default:
      return state;
  }
}
