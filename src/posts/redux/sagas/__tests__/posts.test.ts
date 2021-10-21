// yarn jest src/posts/redux/sagas/__tests__/posts.test.ts --coverage

import { takeLatest, put, all, spawn } from 'redux-saga/effects';

import { GetPostsActionTypes } from '../../actions/types';
import { getPostsActions } from '../../actions/posts';
import postsSaga, { getPostsSaga, getPostsWorker } from '../posts';
import { fakePosts } from 'src/posts/data/fakePosts';

describe('posts sagas', () => {
  // TODO: review and rewrite ?
  describe('getPostsSaga', () => {
    const gen = getPostsSaga();

    it('should yield takeLatest with getPostsWorker effect', () => {
      const actualEffect = gen.next().value;

      const expectedEffect = takeLatest(
        GetPostsActionTypes.REQUEST,
        getPostsWorker,
      );

      expect(actualEffect).toStrictEqual(expectedEffect);
    });

    it('should complete execution and yield done effect', () => {
      expect(gen.next().done).toBe(true);
    });
  });

  describe('getPostsWorker', () => {
    const gen = getPostsWorker();

    it('should yield GetPostsActionTypes.LOADING effect', () => {
      const actualEffect = gen.next().value;

      const expectedEffect = put(getPostsActions.loading());

      expect(actualEffect).toStrictEqual(expectedEffect);
    });

    it('should yield GetPostsActionTypes.SUCCESS effect', () => {
      const actualEffect = gen.next().value;

      const posts = fakePosts; // TODO: use fake repository

      const expectedEffect = put(getPostsActions.success({ posts }));

      expect(actualEffect).toStrictEqual(expectedEffect);
    });

    it.todo('should yield GetPostsActionTypes.FAILURE effect');
  });

  describe('postsSaga', () => {
    const gen = postsSaga();

    it('should yield [getPostsSaga] sagas in spawned mode', () => {
      const actualEffect = gen.next().value;

      const expectedEffect = all([spawn(getPostsSaga)]);

      expect(actualEffect).toStrictEqual(expectedEffect);
    });

    it('should complete execution and yield done effect', () => {
      expect(gen.next().done).toBe(true);
    });
  });
});
