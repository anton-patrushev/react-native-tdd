import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPostsActions } from 'src/posts/redux/actions/posts';
import {
  getAllPostsIDs,
  getPostsIsLoading,
} from 'src/posts/redux/selectors/posts';

import PostsListView from './view';

interface IPostListProps {}

const PostsList: React.FC<IPostListProps> = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getPostsActions.request());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ids = useSelector(getAllPostsIDs);
  const isPostsLoading = useSelector(getPostsIsLoading);

  const isInitialLoading = !!(isPostsLoading && !ids.length);
  const isRefreshing = !!(isPostsLoading && ids.length);

  return (
    <PostsListView
      postsIDs={ids}
      isLoading={isInitialLoading}
      isRefreshing={isRefreshing}
    />
  );
};

export default React.memo(PostsList);
