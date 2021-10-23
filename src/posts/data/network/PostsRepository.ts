import { IPostsRepository } from './IPostsRepository';

class PostsRepository implements IPostsRepository {
  getPosts = () => {
    return Promise.resolve([]);
  };
}

const postsRepository = new PostsRepository();

export default postsRepository;
