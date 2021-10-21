import { createAction } from 'typesafe-actions';

import { GetPostsActionTypes } from './types';

import { Post } from 'src/posts/data/types/post';
import { AsyncActionType } from 'src/shared/types/actions';

const getPostsActionRequest = createAction(
  GetPostsActionTypes.REQUEST,
)<never>();

const getPostsActionLoading = createAction(
  GetPostsActionTypes.LOADING,
)<never>();

const getPostsActionFailure = createAction(GetPostsActionTypes.FAILURE)<{
  errorMessage: string;
}>();

const getPostsActionSuccess = createAction(GetPostsActionTypes.SUCCESS)<{
  posts: Array<Post>;
}>();

export const getPostsActions = {
  [AsyncActionType.REQUEST]: getPostsActionRequest,
  [AsyncActionType.LOADING]: getPostsActionLoading,
  [AsyncActionType.FAILURE]: getPostsActionFailure,
  [AsyncActionType.SUCCESS]: getPostsActionSuccess,
};
