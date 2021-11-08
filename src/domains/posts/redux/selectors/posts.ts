import { Post } from 'src/domains/posts/data/types/post';
import { RootState } from 'typesafe-actions';
import { IPostsReducerState } from '../types/posts';

function getPostsRoot(state: RootState): IPostsReducerState {
  return state.posts;
}

export function getAllPostsIDs(state: RootState) {
  const postsRoot = getPostsRoot(state);

  return postsRoot.data.ids;
}

export function getPostsIsLoading(state: RootState) {
  const postsRoot = getPostsRoot(state);

  return postsRoot.loading;
}

export function getPostsError(state: RootState) {
  const postsRoot = getPostsRoot(state);

  return postsRoot.error;
}

export function getPostByID(state: RootState, id: Post['id']): Post | null {
  const postsRoot = getPostsRoot(state);

  const postByID = postsRoot.data.byId[id];

  if (!postByID) {
    return null;
  }

  return postByID;
}
