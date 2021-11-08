import { put, takeLatest, all, spawn, call } from 'redux-saga/effects';

import DI from 'src/core/ioc/DI';
import { Dependency } from 'src/core/ioc/types';

import { GetPostsActionTypes } from '../actions/types';
import { getPostsActions } from '../actions/posts';
import { Post } from 'src/domains/posts/data/types/post';

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
export function* getPostsWorker() {
  try {
    yield put(getPostsActions.loading());

    const PostsRepository = DI.getDependency(Dependency.POSTS_REPOSITORY);

    const posts: Array<Post> = yield call(PostsRepository.getPosts);

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

  yield all(allPostsSagas.map((saga) => spawn(saga)));
}
