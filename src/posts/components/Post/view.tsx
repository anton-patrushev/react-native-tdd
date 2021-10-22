import React from 'react';
import { View, Text } from 'react-native';
import { PostTestIDs } from 'src/posts/constants/test-ids';

import { Post } from 'src/posts/data/types/post';
import styles from './styles';

interface IPostViewProps {
  post: Post;
}

const PostView: React.FC<IPostViewProps> = props => {
  return (
    <View style={styles.tile} testID={PostTestIDs.POST}>
      <Text style={styles.title}>{props.post.title}</Text>
      <Text style={styles.body}>{props.post.body}</Text>
    </View>
  );
};

export default React.memo(PostView);
