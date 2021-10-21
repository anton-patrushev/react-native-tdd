import FakePostRepository from 'src/posts/api/network/FakePostsRepository';
import { IPostsRepository } from 'src/posts/api/network/IPostsRepository';

import { Dependency } from './types';

interface DIContainer {
  [Dependency.POSTS_REPOSITORY]: IPostsRepository;
}

const container: DIContainer = {
  [Dependency.POSTS_REPOSITORY]: FakePostRepository,
};

function registerDependency<K extends keyof DIContainer>(
  key: K,
  dependency: DIContainer[K],
): void {
  container[key] = dependency;
}

function getDependency<K extends keyof DIContainer>(key: K): DIContainer[K] {
  return container[key];
}

const DI = {
  registerDependency,
  getDependency,
};

export default DI;
