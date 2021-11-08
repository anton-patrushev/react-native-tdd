import FakePostRepository from 'src/domains/posts/data/network/FakePostsRepository';
import { IPostsRepository } from 'src/domains/posts/data/network/IPostsRepository';

import FakeToastNotificationService from 'src/domains/shared/services/notifications/local/toast/FakeToastNotifcationService';
import { IToastNotificationService } from 'src/domains/shared/services/notifications/local/toast/IToastNotificationService';

import { Dependency } from './types';

interface DIContainer {
  [Dependency.POSTS_REPOSITORY]: IPostsRepository;
  [Dependency.TOAST_NOTIFICATION_SERVICE]: IToastNotificationService;
}

const container: DIContainer = {
  [Dependency.POSTS_REPOSITORY]: FakePostRepository,
  [Dependency.TOAST_NOTIFICATION_SERVICE]: FakeToastNotificationService,
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
  const dependency = container[key];

  if (!dependency) {
    throw new Error(`Dependency with key:${key} is missed from DI container`);
  }

  return dependency;
}

const DI = {
  registerDependency,
  getDependency,
};

export default DI;
