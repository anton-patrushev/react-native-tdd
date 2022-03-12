// yarn jest src/posts/screens/__tests__/Feed.test.tsx --coverage

import { waitFor } from '@testing-library/react-native';

import React from 'react';
import { RootState } from 'typesafe-actions';

import { IToastNotificationService } from 'src/domains/shared/services/notifications/local/toast/IToastNotificationService';
import { ToastNotificationOptions } from 'src/domains/shared/services/notifications/local/toast/types/ToastNotificationOptions';
import { ToastNotificationType } from 'src/domains/shared/services/notifications/local/toast/types/ToastNotificationType';

import { IPostsRepository } from 'src/domains/posts/data/network/IPostsRepository';
import { Post } from 'src/domains/posts/data/types/post';

import { renderWithRedux } from 'src/core/redux/testing/renderWithRedux';

import FeedScreen from '../Feed';
import { PostTestIDs } from 'src/domains/posts/constants/test-ids';
import { container } from 'src/core/ioc/container/container';
import { POSTS_MODULE_IDENTIFIERS } from 'src/domains/posts/ioc/modules/posts.symbols';
import FakePostsRepository from 'src/domains/posts/data/network/FakePostsRepository';
import { TOAST_NOTIFICATIONS_IDENTIFIERS } from 'src/domains/shared/ioc/modules/toastNotifications.symbols';
import FakeToastNotificationService from 'src/domains/shared/services/notifications/local/toast/FakeToastNotifcationService';

// TODO: rely just on inversify IoC container (remove custom spying)
describe('full integration FeedScreen', () => {
  // Required to fix `You called act(async () => ...) without await` console error
  const realPromise = global.Promise;

  global.Promise = require('promise-polyfill');

  container.unbindAll();

  container
    .bind<IPostsRepository>(POSTS_MODULE_IDENTIFIERS.POSTS_REPOSITORY)
    .toConstantValue(FakePostsRepository);
  container
    .bind<IToastNotificationService>(
      TOAST_NOTIFICATIONS_IDENTIFIERS.TOAST_NOTIFICATIONS_SERVICE,
    )
    .toConstantValue(FakeToastNotificationService);

  afterAll(() => {
    global.Promise = realPromise;

    container.unbindAll();
  });

  const initialState = {
    posts: { loading: false, data: { byId: {}, ids: [] }, error: null },
  } as RootState;

  const postsRepository = container.get<IPostsRepository>(
    POSTS_MODULE_IDENTIFIERS.POSTS_REPOSITORY,
  );

  const toastNotificationService = container.get<IToastNotificationService>(
    TOAST_NOTIFICATIONS_IDENTIFIERS.TOAST_NOTIFICATIONS_SERVICE,
  );

  let getPostsSpy: jest.SpyInstance<Promise<Post[]>, []>;
  let showToastSpy: jest.SpyInstance;

  beforeEach(() => {
    getPostsSpy = jest.spyOn(postsRepository, 'getPosts');
    showToastSpy = jest.spyOn(toastNotificationService, 'show');
  });

  afterEach(() => {
    getPostsSpy.mockRestore();
    showToastSpy.mockRestore();
  });

  it('should renders loading indicator on mounting', async () => {
    getPostsSpy.mockImplementation(() => Promise.resolve([]));

    const screen = renderWithRedux(<FeedScreen />, { state: initialState });

    // loading indicator should be ignored on first render
    expect(screen.queryByTestId(PostTestIDs.POSTS_LOADING)).not.toBeNull();
    expect(screen.queryByTestId(PostTestIDs.POST_LIST)).toBeNull();

    // when loading indicator should appear
    expect(await screen.findByTestId(PostTestIDs.POSTS_LOADING)).toBeTruthy();

    // after finishing saga loading indicator should disappear
    await waitFor(() => {
      expect(screen.queryByTestId(PostTestIDs.POSTS_LOADING)).toBeNull();
      expect(screen.queryByTestId(PostTestIDs.POST_LIST)).not.toBeNull();
    });

    await waitFor(() => {
      expect(getPostsSpy).toHaveBeenCalledTimes(1);
    });

    expect(showToastSpy).toHaveBeenCalledTimes(0);
  });

  it('should renders posts', async () => {
    getPostsSpy.mockImplementation(() => {
      const posts: Array<Post> = [
        { id: 0, title: 'Some title', body: 'Some body' },
        { id: 1, title: 'Some title 1', body: 'Some body 1' },
        { id: 2, title: 'Some title 2', body: 'Some body 2' },
      ];
      return Promise.resolve(posts);
    });

    const screen = renderWithRedux(<FeedScreen />, { state: initialState });

    await waitFor(async () => {
      const postsTiles = await screen.findAllByTestId(PostTestIDs.POST);
      expect(postsTiles).toHaveLength(3);
    });

    // should finish loading
    await waitFor(() => {
      expect(screen.queryByTestId(PostTestIDs.POSTS_LOADING)).toBeNull();
    });

    await waitFor(() => {
      expect(getPostsSpy).toHaveBeenCalledTimes(1);
    });

    expect(showToastSpy).toHaveBeenCalledTimes(0);
  });

  it('should react on error state', async () => {
    getPostsSpy.mockImplementation(() => {
      return Promise.reject("Does't matter for now");
    });

    showToastSpy.mockImplementation(() => {});

    const screen = renderWithRedux(<FeedScreen />, { state: initialState });

    await waitFor(() => {
      expect(screen.queryByTestId(PostTestIDs.POST_LIST)).not.toBeNull();
    });

    // should finish loading
    await waitFor(() => {
      expect(screen.queryByTestId(PostTestIDs.POSTS_LOADING)).toBeNull();
    });

    await waitFor(() => {
      expect(getPostsSpy).toHaveBeenCalledTimes(1);
    });

    await waitFor(() => {
      expect(showToastSpy).toHaveBeenCalledTimes(1);

      const showToastOptions: ToastNotificationOptions = {
        type: ToastNotificationType.ERROR,
        title: 'Loading posts failed',
        body: 'Something went wrong',
      };

      expect(showToastSpy).toHaveBeenCalledWith(showToastOptions);
    });
  });

  it('should render only correct posts and ignore dummy nulls', async () => {
    getPostsSpy.mockImplementation(() => {
      const posts: Array<Post> = [
        { id: 0, title: 'Some title', body: 'Some body' },
        // @ts-ignore
        0, // just to simulate dummy situation for missing post in store
        { id: 2, title: 'Some title 2', body: 'Some body 2' },
      ];
      return Promise.resolve(posts);
    });

    showToastSpy.mockImplementation(() => {});

    const screen = renderWithRedux(<FeedScreen />, { state: initialState });

    await waitFor(() => {
      expect(screen.queryByTestId(PostTestIDs.POST_LIST)).not.toBeNull();
    });

    // should finish loading
    await waitFor(() => {
      expect(screen.queryByTestId(PostTestIDs.POSTS_LOADING)).toBeNull();
    });

    await waitFor(() => {
      expect(getPostsSpy).toHaveBeenCalledTimes(1);
    });

    await waitFor(async () => {
      expect(await screen.findAllByTestId(PostTestIDs.POST)).toHaveLength(2);
    });

    expect(showToastSpy).toHaveBeenCalledTimes(0);
  });
});
