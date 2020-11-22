import { getCourseTypes } from '../actions/types';

const initialState = {
  course: {},
  loading: null,
  error: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case getCourseTypes.REQUEST:
      return { ...state, loading: true };

    case getCourseTypes.SUCCESS:
      return { ...state, loading: false, course: payload.data };
    case getCourseTypes.FAIL:
      return { ...state, loading: false, error: payload };

    default:
      return state;
  }
}
