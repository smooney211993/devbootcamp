import { deleteCourseTypes } from '../actions/types';

const initialState = {
  loading: null,
  success: null,
  error: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  const { REQUEST, SUCCESS, FAIL, RESET } = deleteCourseTypes;
  switch (type) {
    case REQUEST:
      return { ...state, loading: true };
    case SUCCESS:
      return { ...state, loading: false, success: true };
    case FAIL: {
      return { ...state, loading: false, success: false, error: payload };
    }

    case RESET:
      return {
        loading: null,
        success: null,
        error: null,
      };

    default:
      return state;
  }
}
