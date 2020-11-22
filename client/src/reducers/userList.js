import { getUserListTypes } from '../actions/types';

const initialState = {
  users: [],
  loading: null,
  error: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case getUserListTypes.REQUEST:
      return { ...state, loading: true };

    case getUserListTypes.SUCCESS:
      return { ...state, loading: false, error: null, users: payload.data };
    case getUserListTypes.FAIL:
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
}
