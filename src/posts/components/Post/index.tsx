import React from 'react';
import { useSelector } from 'react-redux';

import { Post as PostType } from 'src/posts/data/types/post';
import { getPostByID } from 'src/posts/redux/selectors/posts';

import PostView from './view';

interface IPostProps {
  id: PostType['id'];
}

const Post: React.FC<IPostProps> = (props) => {
  const post = useSelector((state) => getPostByID(state, props.id));

  if (!post) {
    return null; // TODO: return placeholder
  }

  return <PostView post={post} />;
};

export default React.memo(Post);
