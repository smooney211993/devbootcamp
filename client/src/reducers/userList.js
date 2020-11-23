import { getUserListTypes } from '../actions/types';

const initialState = {
  users: [],
  loading: null,
  error: null,
  page: null,
  pages: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case getUserListTypes.REQUEST:
      return { ...state, loading: true };

    case getUserListTypes.SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        users: payload.data,
        page: payload.page,
        pages: payload.pages,
      };
    case getUserListTypes.FAIL:
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
}
