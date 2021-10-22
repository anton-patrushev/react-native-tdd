import { createStore, applyMiddleware } from 'redux';
import { RootState } from 'typesafe-actions';
import createSagaMiddleware from '@redux-saga/core';

import rootReducer from '../reducers';
import rootSaga from '../sagas';

export function buildStore(initialPreloadState?: RootState | undefined) {
  const sagaMiddleware = createSagaMiddleware();

  const middlewares = [sagaMiddleware];

  const store = createStore(
    rootReducer,
    initialPreloadState,
    applyMiddleware(...middlewares),
  );

  sagaMiddleware.run(rootSaga);

  return store;
}
