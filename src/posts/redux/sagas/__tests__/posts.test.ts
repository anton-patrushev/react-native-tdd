// yarn jest src/posts/redux/sagas/__tests__/posts.test.ts --coverage

import DI from 'src/core/ioc/DI';
import { Dependency } from 'src/core/ioc/types';

import { takeLatest, all, spawn } from 'redux-saga/effects';
import { runSaga } from '@redux-saga/core';

import { GetPostsActionTypes } from '../../actions/types';
import { getPostsActions } from '../../actions/posts';
import postsSaga, { getPostsSaga, getPostsWorker } from '../posts';

import { IPostsRepository } from 'src/posts/data/network/IPostsRepository';
import { Post } from 'src/posts/data/types/post';

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
    const postsRepository: IPostsRepository = DI.getDependency(
      Dependency.POSTS_REPOSITORY,
    );

    let getPostsSpy: jest.SpyInstance<Promise<Post[]>, []>;

    beforeEach(() => {
      getPostsSpy = jest.spyOn(postsRepository, 'getPosts');
    });

    afterEach(() => {
      getPostsSpy.mockRestore();
    });

    it('should successfully get posts and yield all required effects', async () => {
      const mockedPosts: Array<Post> = [{ id: 0, title: 'test', body: 'body' }];
      const dispatched: Array<any> = [];

      getPostsSpy.mockImplementationOnce(() => Promise.resolve(mockedPosts));

      const dispatch = jest.fn(action => dispatched.push(action));
      await runSaga({ dispatch }, getPostsWorker as any).toPromise();

      const expectedActions = [
        getPostsActions.loading(),
        getPostsActions.success({ posts: mockedPosts }),
      ];

      expect(dispatched).toStrictEqual(expectedActions);
    });

    it('should yield error action if PostsRepository failed', async () => {
      const dispatched: Array<any> = [];

      getPostsSpy.mockImplementationOnce(() =>
        Promise.reject("Doesn't matter"),
      );

      const dispatch = jest.fn(action => dispatched.push(action));
      await runSaga({ dispatch }, getPostsWorker as any).toPromise();

      const expectedActions = [
        getPostsActions.loading(),
        getPostsActions.failure({ errorMessage: 'Something went wrong' }), // TODO
      ];

      expect(dispatched).toStrictEqual(expectedActions);
    });
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
