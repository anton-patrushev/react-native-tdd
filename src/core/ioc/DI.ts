import FakePostRepository from 'src/domains/posts/data/network/FakePostsRepository';

import FakeToastNotificationService from 'src/domains/shared/services/notifications/local/toast/FakeToastNotifcationService';

import { Dependency, DIContainer } from './types';

const container: DIContainer = {
  [Dependency.POSTS_REPOSITORY]: FakePostRepository,
  [Dependency.TOAST_NOTIFICATION_SERVICE]: FakeToastNotificationService,
};

function registerDependency<K extends keyof DIContainer>(
  key: K,
  dependency: DIContainer[K],
): void {
  container[key] = dependency;
}

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
