import { put, takeLatest, all, spawn } from 'redux-saga/effects';

import { Post } from 'src/posts/data/types/post';
import { fakePosts } from 'src/posts/data/fakePosts';

import { GetPostsActionTypes } from '../actions/types';
import { getPostsActions } from '../actions/posts';

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
export function* getPostsWorker() {
  try {
    yield put(getPostsActions.loading());

    const posts: Array<Post> = fakePosts;

    yield put(getPostsActions.success({ posts }));
  } catch (e) {
    yield put(
      getPostsActions.failure({ errorMessage: 'Something went wrong' }),
    );
  }
}

export function* getPostsSaga() {
  yield takeLatest(GetPostsActionTypes.REQUEST, getPostsWorker);
}

export default function* postsSaga() {
  const allPostsSagas = [getPostsSaga];

  yield all(allPostsSagas.map(saga => spawn(saga)));
}
