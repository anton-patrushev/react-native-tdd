// yarn jest src/posts/redux/reducers/__tests__/posts.test.ts --coverage

import { Post } from 'src/posts/data/types/post';

import { IPostsReducerState } from 'src/posts/redux/types/posts';
import { getPostsActions } from 'src/posts/redux/actions/posts';
import postsReducer from '../posts';

describe('postsReducer', () => {
  const post1: Post = { id: 1, title: 't', body: 'value' };
  const post2: Post = { id: 2, title: 't24', body: 'value24' };
  const post3: Post = { id: 3, title: '345sd', body: 'bbbb' };
  const post4: Post = { id: 4, title: 't4', body: 'value2' };

  describe('general', () => {
    it('should return the initial state and ignore dummy action', () => {
      const previousState = undefined;
      const action = {} as any;

      const expectedNewState: IPostsReducerState = {
        loading: false,
        data: { byId: {}, ids: [] },
        error: null,
      };

      const actualNewState = postsReducer(previousState, action as any);

      expect(actualNewState).toStrictEqual(expectedNewState);
    });
  });

  describe('getPostsActions.request', () => {
    it('should return previous failure state and ignore request action', () => {
      const previousState: IPostsReducerState = {
        loading: false,
        data: {
          byId: {
            [post1.id]: post1,
            [post2.id]: post2,
          },
          ids: [post1.id, post2.id],
        },
        error: 'Some error',
      };
      const action = getPostsActions.request();

      const expectedNewState: IPostsReducerState = {
        ...previousState,
      };
      const actualNewState = postsReducer(previousState, action);

      expect(actualNewState).toStrictEqual(expectedNewState);
    });

    it('should return previous loading state and ignore request action', () => {
      const previousState: IPostsReducerState = {
        loading: true,
        data: {
          byId: {},
          ids: [],
        },
        error: null,
      };
      const action = getPostsActions.request();

      const expectedNewState: IPostsReducerState = {
        ...previousState,
      };
      const actualNewState = postsReducer(previousState, action);

      expect(actualNewState).toStrictEqual(expectedNewState);
    });

    it('should return previous success state and ignore request action', () => {
      const previousState: IPostsReducerState = {
        loading: false,
        data: {
          byId: {
            [post1.id]: post1,
            [post2.id]: post2,
          },
          ids: [post1.id, post2.id],
        },
        error: null,
      };
      const action = getPostsActions.request();

      const expectedNewState: IPostsReducerState = {
        ...previousState,
      };
      const actualNewState = postsReducer(previousState, action);

      expect(actualNewState).toStrictEqual(expectedNewState);
    });
  });

  describe('getPostsActions.loading', () => {
    it('should return previous loading state', () => {
      const previousState: IPostsReducerState = {
        loading: true,
        data: {
          byId: {
            [post1.id]: post1,
            [post4.id]: post4,
          },
          ids: [post1.id, post4.id],
        },
        error: null,
      };
      const action = getPostsActions.loading();

      const expectedNewState: IPostsReducerState = {
        ...previousState,
      };

      const actualNewState = postsReducer(previousState, action);

      expect(actualNewState).toStrictEqual(expectedNewState);
    });

    it('should transit from previous failure to new loading state', () => {
      const previousState: IPostsReducerState = {
        loading: false,
        data: {
          byId: {
            [post1.id]: post1,
            [post4.id]: post4,
          },
          ids: [post1.id, post4.id],
        },
        error: 'Some error',
      };
      const action = getPostsActions.loading();

      const expectedNewState: IPostsReducerState = {
        loading: true,
        data: previousState.data,
        error: null,
      };

      const actualNewState = postsReducer(previousState, action);

      expect(actualNewState).toStrictEqual(expectedNewState);
    });

    it('should transit from previous success to new loading state', () => {
      const previousState: IPostsReducerState = {
        loading: false,
        data: {
          byId: {
            [post1.id]: post1,
            [post4.id]: post4,
          },
          ids: [post1.id, post4.id],
        },
        error: null,
      };
      const action = getPostsActions.loading();

      const expectedNewState: IPostsReducerState = {
        loading: true,
        data: previousState.data,
        error: null,
      };

      const actualNewState = postsReducer(previousState, action);

      expect(actualNewState).toStrictEqual(expectedNewState);
    });
  });

  describe('getPostsActions.failure', () => {
    it('should return previous failure state', () => {
      const previousState: IPostsReducerState = {
        loading: false,
        data: {
          byId: {
            [post1.id]: post1,
            [post3.id]: post3,
          },
          ids: [post1.id, post3.id],
        },
        error: 'Previous error message',
      };
      const action = getPostsActions.failure({
        errorMessage: 'Previous error message',
      });

      const expectedNewState: IPostsReducerState = {
        ...previousState,
      };

      const actualNewState = postsReducer(previousState, action);

      expect(actualNewState).toStrictEqual(expectedNewState);
    });

    it('should transit from previous loading state to the new failure state', () => {
      const previousState: IPostsReducerState = {
        loading: true,
        data: {
          byId: {
            [post1.id]: post1,
            [post3.id]: post3,
          },
          ids: [post1.id, post3.id],
        },
        error: null,
      };
      const action = getPostsActions.failure({
        errorMessage: 'Some new error message',
      });

      const expectedNewState: IPostsReducerState = {
        loading: false,
        data: previousState.data,
        error: 'Some new error message',
      };

      const actualNewState = postsReducer(previousState, action);

      expect(actualNewState).toStrictEqual(expectedNewState);
    });

    it('should transit from previous success state to the new failure state and save data', () => {
      const previousState: IPostsReducerState = {
        loading: false,
        data: {
          byId: {
            [post1.id]: post1,
            [post3.id]: post3,
          },
          ids: [post1.id, post3.id],
        },
        error: null,
      };
      const action = getPostsActions.failure({
        errorMessage: 'New error message',
      });

      const expectedNewState: IPostsReducerState = {
        loading: false,
        data: previousState.data,
        error: 'New error message',
      };

      const actualNewState = postsReducer(previousState, action);

      expect(actualNewState).toStrictEqual(expectedNewState);
    });
  });

  describe('getPostsActions.success', () => {
    it('should return previous success state', () => {
      const previousState: IPostsReducerState = {
        loading: false,
        data: {
          byId: {
            [post1.id]: post1,
            [post3.id]: post3,
          },
          ids: [post1.id, post3.id],
        },
        error: null,
      };
      const action = getPostsActions.success({ posts: [post1, post3] });

      const expectedNewState: IPostsReducerState = {
        ...previousState,
      };

      const actualNewState = postsReducer(previousState, action);

      expect(actualNewState).toStrictEqual(expectedNewState);
    });

    it('should transit from previous loading state to new success state', () => {
      const previousState: IPostsReducerState = {
        loading: true,
        data: {
          byId: {},
          ids: [],
        },
        error: null,
      };
      const action = getPostsActions.success({ posts: [post1, post3, post2] });

      const expectedNewState: IPostsReducerState = {
        loading: false,
        data: {
          byId: {
            [post1.id]: post1,
            [post3.id]: post3,
            [post2.id]: post2,
          },
          ids: [post1.id, post3.id, post2.id],
        },
        error: null,
      };

      const actualNewState = postsReducer(previousState, action);

      expect(actualNewState).toStrictEqual(expectedNewState);
    });

    it('should transit from previous failure state to new success state', () => {
      const previousState: IPostsReducerState = {
        loading: false,
        data: {
          byId: {
            [post1.id]: post1,
          },
          ids: [post1.id],
        },
        error: 'Some old error',
      };
      const action = getPostsActions.success({ posts: [post2, post4] });

      const expectedNewState: IPostsReducerState = {
        loading: false,
        data: {
          byId: {
            [post2.id]: post2,
            [post4.id]: post4,
          },
          ids: [post2.id, post4.id],
        },
        error: null,
      };

      const actualNewState = postsReducer(previousState, action);

      expect(actualNewState).toStrictEqual(expectedNewState);
    });

    it('should transit from previous success state to new success state', () => {
      const previousState: IPostsReducerState = {
        loading: false,
        data: {
          byId: {
            [post1.id]: post1,
          },
          ids: [post1.id],
        },
        error: null,
      };
      const action = getPostsActions.success({ posts: [] });

      const expectedNewState: IPostsReducerState = {
        loading: false,
        data: {
          byId: {},
          ids: [],
        },
        error: null,
      };

      const actualNewState = postsReducer(previousState, action);

      expect(actualNewState).toStrictEqual(expectedNewState);
    });
  });
});
