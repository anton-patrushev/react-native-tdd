import { createReducer } from 'typesafe-actions';

import { Post } from 'src/posts/data/types/post';

import { GetPostsActionTypes } from 'src/posts/redux/actions/types';

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
  .handleType(GetPostsActionTypes.SUCCESS, state => ({
    ...state,
    loading: false,
    data: { byId: {} }, // TODO
    error: null,
  }));

export default postsReducer;
