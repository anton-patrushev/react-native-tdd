import { createAction } from 'typesafe-actions';

import { GetPostsActionTypes } from './types';

import { Post } from 'src/posts/data/types/post';

const getPostsActionRequest = createAction(
  GetPostsActionTypes.REQUEST,
)<never>();

const getPostsActionLoading = createAction(
  GetPostsActionTypes.LOADING,
)<never>();

const getPostsActionFailure = createAction(GetPostsActionTypes.FAILURE)<{
  errorMessage: string;
}>();

const getPostsActionSuccess = createAction(GetPostsActionTypes.SUCCESS)<
  Array<Post>
>();

export const getPostsActions = {
  getPostsActionRequest,
  getPostsActionLoading,
  getPostsActionFailure,
  getPostsActionSuccess,
};
