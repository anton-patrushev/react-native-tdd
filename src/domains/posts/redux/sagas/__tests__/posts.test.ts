// yarn jest src/domains/posts/redux/sagas/__tests__/posts.test.ts --coverage

import { takeLatest, all, spawn } from 'redux-saga/effects';
import { runSaga } from '@redux-saga/core';

import { GetPostsActionTypes } from '../../actions/types';
import { getPostsActions } from '../../actions/posts';
import postsSaga, { getPostsSaga, getPostsWorker } from '../posts';

import { IPostsRepository } from 'src/domains/posts/data/network/IPostsRepository';
import { Post } from 'src/domains/posts/data/types/post';
import { container } from 'src/core/ioc/container/container';
import { POSTS_MODULE_IDENTIFIERS } from 'src/domains/posts/ioc/modules/posts.symbols';
import FakePostsRepository from 'src/domains/posts/data/network/FakePostsRepository';

// TODO: improve to rely just on IoC container (remove custom spying)
describe('posts sagas', () => {
  container.unbindAll();

  container
    .bind<IPostsRepository>(POSTS_MODULE_IDENTIFIERS.POSTS_REPOSITORY)
    .toConstantValue(FakePostsRepository);

  afterAll(() => {
    container.unbindAll();
  });

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
    const postsRepository: IPostsRepository = container.get<IPostsRepository>(
      POSTS_MODULE_IDENTIFIERS.POSTS_REPOSITORY,
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

      const dispatch = jest.fn((action) => dispatched.push(action));
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

      const dispatch = jest.fn((action) => dispatched.push(action));
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
