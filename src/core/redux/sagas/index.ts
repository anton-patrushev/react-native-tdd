import { all, spawn } from '@redux-saga/core/effects';

import postsSaga from 'src/posts/redux/sagas/posts';

export default function* rootSaga() {
  const allSagas = [postsSaga];

  yield all(allSagas.map((saga) => spawn(saga)));
}
