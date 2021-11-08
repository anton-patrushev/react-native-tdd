import { mapPostsFromNetwork } from '../mappings/posts';
import { IPostsRepository } from './IPostsRepository';

class PostsRepository implements IPostsRepository {
  getPosts = async () => {
    const result = await fetch('https://jsonplaceholder.typicode.com/posts');
    const json = await result.json();

    return mapPostsFromNetwork(json);
  };
}

const postsRepository = new PostsRepository();

export default postsRepository;
