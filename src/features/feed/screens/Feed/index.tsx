import React from 'react';
import { View } from 'react-native';

import PostList from 'src/domains/posts/components/PostList';

import useFeedScreen from './hooks';

import styles from './styles';

interface IFeedScreenProps {}

const FeedScreen: React.FC<IFeedScreenProps> = () => {
  useFeedScreen();

  return (
    <View style={styles.content}>
      <PostList />
    </View>
  );
};

export default React.memo(FeedScreen);
