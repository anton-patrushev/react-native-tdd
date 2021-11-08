import { fakePosts } from 'src/domains/posts/data/fakePosts';

import { IPostsRepository } from './IPostsRepository';

// Ignore test coverage for PostsRepository
/* istanbul ignore next */
class FakePostsRepository implements IPostsRepository {
  getPosts = () => {
    return Promise.resolve(fakePosts);
  };
}

const fakePostRepository = new FakePostsRepository();

export default fakePostRepository;
