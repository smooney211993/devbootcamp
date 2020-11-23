import { adminCreateUserTypes } from '../actions/types';

const initialState = {
  user: null,
  loading: null,
  success: null,
  error: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case adminCreateUserTypes.REQUEST:
      return { ...state, loading: true };
    case adminCreateUserTypes.SUCCESS:
      return { ...state, loading: false, error: null, user: payload.data };
    case adminCreateUserTypes.FAIL:
      return { ...state, loading: false, error: payload };

    default:
      return state;
  }
}
