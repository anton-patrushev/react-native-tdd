import { createReducer } from 'typesafe-actions';

import { GetPostsActionTypes } from 'src/posts/redux/actions/types';
import { IPostsReducerState } from 'src/posts/redux/types/posts';

import normalizeData from 'src/shared/utils/normalizeData';

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
