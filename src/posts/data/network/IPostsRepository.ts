import { Post } from 'src/posts/data/types/post';

export interface IPostsRepository {
  getPosts(): Promise<Array<Post>>;
}
