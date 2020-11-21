import { courseTypes } from '../actions/types';

const initialState = {
  loading: null,
  courses: [],
  error: null,
  page: null,
  pages: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case courseTypes.REQUEST:
      return { ...state, loading: true };
    case courseTypes.SUCCESS:
      return {
        ...state,
        loading: false,
        courses: payload.data,
        page: payload.page,
        pages: payload.pages,
      };
    case courseTypes.FAIL:
      return { ...state, loading: false, error: payload };

    default:
      return state;
  }
}
