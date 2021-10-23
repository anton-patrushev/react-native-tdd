import FakePostRepository from 'src/posts/data/network/FakePostsRepository';
import { IPostsRepository } from 'src/posts/data/network/IPostsRepository';

import { Dependency } from './types';

interface DIContainer {
  [Dependency.POSTS_REPOSITORY]: IPostsRepository;
}

const container: DIContainer = {
  [Dependency.POSTS_REPOSITORY]: FakePostRepository,
};

// Ignore from the coverage
/* istanbul ignore next */
function registerDependency<K extends keyof DIContainer>(
  key: K,
  dependency: DIContainer[K],
): void {
  container[key] = dependency;
}

// Ignore from the coverage
/* istanbul ignore next */
function getDependency<K extends keyof DIContainer>(key: K): DIContainer[K] {
  return container[key];
}

const DI = {
  registerDependency,
  getDependency,
};

export default DI;
