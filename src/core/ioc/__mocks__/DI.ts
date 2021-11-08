import FakePostRepository from 'src/domains/posts/data/network/FakePostsRepository';

import FakeToastNotificationService from 'src/domains/shared/services/notifications/local/toast/FakeToastNotifcationService';

import { Dependency, DIContainer } from '../types';

const mockedContainer: DIContainer = {
  [Dependency.POSTS_REPOSITORY]: FakePostRepository,
  [Dependency.TOAST_NOTIFICATION_SERVICE]: FakeToastNotificationService,
};

const MockedDI = {
  registerDependency: jest.fn(
    <K extends keyof DIContainer>(key: K, dependency: DIContainer[K]) => {
      mockedContainer[key] = dependency;
    },
  ),
  getDependency: jest.fn(
    <K extends keyof DIContainer>(key: K): DIContainer[K] => {
      return mockedContainer[key];
    },
  ),
};

export default MockedDI;
