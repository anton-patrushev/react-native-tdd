import { Post } from 'src/domains/posts/data/types/post';

export interface IPostsRepository {
  getPosts(): Promise<Array<Post>>;
}
