import { put, takeLatest, all, spawn, call } from 'redux-saga/effects';

import { GetPostsActionTypes } from '../actions/types';
import { getPostsActions } from '../actions/posts';
import { Post } from 'src/domains/posts/data/types/post';
import { container } from 'src/core/ioc/container/container';
import { IPostsRepository } from 'src/domains/posts/data/network/IPostsRepository';
import { POSTS_MODULE_IDENTIFIERS } from 'src/domains/posts/ioc/modules/posts.symbols';

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
export function* getPostsWorker() {
  try {
    yield put(getPostsActions.loading());

    const PostsRepository = container.get<IPostsRepository>(
      POSTS_MODULE_IDENTIFIERS.POSTS_REPOSITORY,
    );

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
