import React from 'react';

import PostsListView from './view';

interface IPostListProps {}

const PostsList: React.FC<IPostListProps> = () => {
  return <PostsListView />;
};

export default React.memo(PostsList);
