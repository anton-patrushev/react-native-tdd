import { fakePosts } from 'src/posts/data/fakePosts';

import { IPostsRepository } from './IPostsRepository';

class FakePostsRepository implements IPostsRepository {
  getPosts = () => {
    return Promise.resolve(fakePosts);
  };
}

const fakePostRepository = new FakePostsRepository();

export default fakePostRepository;
