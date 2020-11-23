import { getUserDetailsTypes } from '../actions/types';

const initialState = {
  user: {},
  loading: null,
  error: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case getUserDetailsTypes.REQUEST:
      return { ...state, loading: true };

    case getUserDetailsTypes.SUCCESS:
      return { ...state, loading: false, error: null, user: payload.data };
    case getUserDetailsTypes.FAIL:
      return { ...state, loading: false, error: payload };

    default:
      return state;
  }
}
