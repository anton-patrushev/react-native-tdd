import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  RefreshControl,
} from 'react-native';

import { PostTestIDs } from 'src/domains/posts/constants/test-ids';
import { Post as PostType } from 'src/domains/posts/data/types/post';

import PostTile from 'src/domains/posts/components/Post';

interface IPostsListViewProps {
  postsIDs: Array<PostType['id']>;
  isLoading: boolean;
  isRefreshing: boolean;
}

const renderItem: ListRenderItem<PostType['id']> = ({ item }) => {
  return <PostTile id={item} />;
};

const PostsListView: React.FC<IPostsListViewProps> = (props) => {
  if (props.isLoading) {
    return <ActivityIndicator testID={PostTestIDs.POSTS_LOADING} />;
  }

  return (
    <FlatList
      data={props.postsIDs}
      renderItem={renderItem}
      testID={PostTestIDs.POST_LIST}
      refreshControl={
        <RefreshControl
          testID={PostTestIDs.POSTS_REFRESHING}
          refreshing={props.isRefreshing}
        />
      }
    />
  );
};

export default React.memo(PostsListView);
