import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';

import PostList from 'src/posts/components/PostList';

import styles from './styles';

interface IFeedScreenProps {}

const FeedScreen: React.FC<IFeedScreenProps> = () => {
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.title}>Header</Text>
      </View>
      <View style={styles.content}>
        <PostList />
      </View>
      <View style={styles.bottom}>
        <Text style={styles.title}>Bottom</Text>
      </View>
    </SafeAreaView>
  );
};

export default React.memo(FeedScreen);
