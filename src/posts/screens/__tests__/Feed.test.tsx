// yarn jest src/posts/screens/__tests__/Feed.test.tsx --coverage

import { waitFor } from '@testing-library/react-native';

import React from 'react';
import { RootState } from 'typesafe-actions';

import DI from 'src/core/ioc/DI';
import { Dependency } from 'src/core/ioc/types';

import { IPostsRepository } from 'src/posts/data/network/IPostsRepository';
import { Post } from 'src/posts/data/types/post';

import { renderWithRedux } from 'src/core/redux/testing/renderWithRedux';

import FeedScreen from '../Feed';
import { PostTestIDs } from 'src/posts/constants/test-ids';

describe('full integration FeedScreen', () => {
  // Required to fix `You called act(async () => ...) without await` console error
  const realPromise = global.Promise;

  beforeAll(() => {
    global.Promise = require('promise-polyfill');
  });

  afterAll(() => {
    global.Promise = realPromise;
  });

  const initialState = {
    posts: { loading: false, data: { byId: {}, ids: [] }, error: null },
  } as RootState;

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

  it('should renders loading indicator on mounting', async () => {
    getPostsSpy.mockImplementation(() => Promise.resolve([]));

    const screen = renderWithRedux(<FeedScreen />, { state: initialState });

    // loading indicator should be ignored on first render
    expect(screen.queryByTestId(PostTestIDs.POSTS_LOADING)).not.toBeNull();
    expect(screen.queryByTestId(PostTestIDs.POST_LIST)).toBeNull();

    // when loading indicator should appears
    expect(await screen.findByTestId(PostTestIDs.POSTS_LOADING)).toBeTruthy();

    // after finishing saga loading indicator should disappears
    await waitFor(() => {
      expect(screen.queryByTestId(PostTestIDs.POSTS_LOADING)).toBeNull();
      expect(screen.queryByTestId(PostTestIDs.POST_LIST)).not.toBeNull();
    });

    await waitFor(() => {
      expect(getPostsSpy).toHaveBeenCalledTimes(1);
    });
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
  });

  it.todo('should react on error state');
});
