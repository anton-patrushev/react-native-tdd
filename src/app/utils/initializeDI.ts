import DI from 'src/core/ioc/DI';
import { Dependency } from 'src/core/ioc/types';
import PostRepository from 'src/posts/api/network/PostsRepository';

export function initializeDIContainer() {
  DI.registerDependency(Dependency.POSTS_REPOSITORY, PostRepository);
}
