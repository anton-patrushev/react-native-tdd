// yarn jest src/posts/redux/selectors/__tests__/posts.test.ts --coverage

import { Post } from 'src/posts/data/types/post';
import { RootState } from 'typesafe-actions';

import {
  getPostsIsLoading,
  getPostsError,
  getAllPostsIDs,
  getPostByID,
} from '../posts';

describe('posts selectors', () => {
  describe('getPostsIsLoading', () => {
    it('should return true for loading state', () => {
      const state = {
        posts: {
          loading: true,
          data: { byId: {}, ids: [] },
          error: null,
        },
      } as RootState;

      const expectedResult = true;
      const actualResult = getPostsIsLoading(state);

      expect(actualResult).toBe(expectedResult);
    });

    it('should return false for non-loading state', () => {
      const state = {
        posts: {
          loading: false,
          data: { byId: {}, ids: [] },
          error: 'just for example',
        },
      } as RootState;

      const expectedResult = false;
      const actualResult = getPostsIsLoading(state);

      expect(actualResult).toBe(expectedResult);
    });
  });

  describe('getPostsError', () => {
    it('should return null for non-failure state', () => {
      const state = {
        posts: {
          loading: true,
          data: { byId: {}, ids: [] },
          error: null,
        },
      } as RootState;

      const expectedResult = null;
      const actualResult = getPostsError(state);

      expect(actualResult).toBe(expectedResult);
    });

    it('should return "error" for failure state', () => {
      const state = {
        posts: {
          loading: false,
          data: { byId: {}, ids: [] },
          error: 'error',
        },
      } as RootState;

      const expectedResult = 'error';
      const actualResult = getPostsError(state);

      expect(actualResult).toBe(expectedResult);
    });
  });

  const post1: Post = { id: 1, title: 't', body: 'value' };
  const post2: Post = { id: 2, title: 't24', body: 'value24' };
  const post3: Post = { id: 3, title: '345sd', body: 'bbbb' };
  const post4: Post = { id: 4, title: 't4', body: 'value2' };

  describe('getAllPostsIDs', () => {
    it('should return [post1, post3] ids', () => {
      const state = {
        posts: {
          loading: true,
          data: {
            byId: {
              [post1.id]: post1,
              [post3.id]: post3,
            },
            ids: [post1.id, post3.id],
          },
          error: null,
        },
      } as RootState;

      const expectedResult = [post1.id, post3.id];
      const actualResult = getAllPostsIDs(state);

      expect(actualResult).toStrictEqual(expectedResult);
    });

    it('should return []', () => {
      const state = {
        posts: {
          loading: false,
          data: { byId: {}, ids: [] },
          error: null,
        },
      } as RootState;

      const expectedResult: Array<Post['id']> = [];
      const actualResult = getAllPostsIDs(state);

      expect(actualResult).toStrictEqual(expectedResult);
    });
  });

  describe('getPostByID', () => {
    it('should return null', () => {
      const state = {
        posts: {
          loading: false,
          data: {
            byId: {
              [post3.id]: post3,
            },
            ids: [post3.id],
          },
          error: null,
        },
      } as RootState;

      const expectedResult = null;
      const actualResult = getPostByID(state, post1.id);

      expect(actualResult).toStrictEqual(expectedResult);
    });

    it('should return post4', () => {
      const state = {
        posts: {
          loading: true,
          data: {
            byId: {
              [post2.id]: post1,
              [post4.id]: post4,
            },
            ids: [post1.id, post4.id],
          },
          error: null,
        },
      } as RootState;

      const expectedResult = post4;
      const actualResult = getPostByID(state, post4.id);

      expect(actualResult).toStrictEqual(expectedResult);
    });
  });
});
