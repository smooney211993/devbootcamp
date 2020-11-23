import { createBootcampTypes } from '../actions/types';

const initialState = {
  bootcamp: null,
  loading: null,
  success: null,
  error: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case createBootcampTypes.REQUEST:
      return { ...state, loading: true };
    case createBootcampTypes.SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        success: true,
        bootcamp: payload.data,
      };

    case createBootcampTypes.FAIL:
      return { ...state, loading: false, error: payload };
    case createBootcampTypes.RESET:
      return { bootcamp: null, loading: null, success: null, error: null };

    default:
      return state;
  }
}
