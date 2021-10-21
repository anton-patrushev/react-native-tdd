import { createReducer } from 'typesafe-actions';

import { Post } from 'src/posts/data/types/post';

import { GetPostsActionTypes } from 'src/posts/redux/actions/types';

import normalizeData from 'src/shared/utils/normalizeData';

interface IPostsReducerState {
  loading: boolean;
  data: {
    byId: Record<Post['id'], Post>;
    ids: Array<Post['id']>;
  };
  error: string | null;
}

const initialState: IPostsReducerState = {
  loading: false,
  data: { byId: {}, ids: [] },
  error: null,
};

const postsReducer = createReducer<IPostsReducerState>(initialState)
  .handleType(GetPostsActionTypes.LOADING, state => ({
    ...state,
    loading: true,
    error: null,
  }))
  .handleType(GetPostsActionTypes.FAILURE, (state, action) => ({
    ...state,
    loading: false,
    error: action.payload.errorMessage,
  }))
  .handleType(GetPostsActionTypes.SUCCESS, (state, action) => ({
    ...state,
    loading: false,
    data: {
      byId: normalizeData(action.payload.posts),
      ids: action.payload.posts.map(it => it.id),
    },
    error: null,
  }));

export default postsReducer;
