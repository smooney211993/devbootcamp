import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas/index';
import { setAuthToken } from './utils/authToken';

const sagaMiddleware = createSagaMiddleware();
const initialState = {};
const middleWare = [sagaMiddleware];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleWare))
);

sagaMiddleware.run(rootSaga);

let currentState = store.getState();
store.subscribe(() => {
  // keep track of the previous and current state to compare changes
  let previousState = currentState;
  currentState = store.getState();
  // if the token changes set the value in localStorage and axios headers
  if (
    previousState.userLoginRegister.token !==
    currentState.userLoginRegister.token
  ) {
    const token = currentState.userLoginRegister.token;
    setAuthToken(token);
  }
});

export default store;
