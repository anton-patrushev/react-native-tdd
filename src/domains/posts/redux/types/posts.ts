import { Post } from 'src/domains/posts/data/types/post';

export interface IPostsReducerState {
  loading: boolean;
  data: {
    byId: Record<Post['id'], Post>;
    ids: Array<Post['id']>;
  };
  error: string | null;
}
