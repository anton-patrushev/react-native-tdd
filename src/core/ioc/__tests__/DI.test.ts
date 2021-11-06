// yarn jest --coverage src/core/ioc/__tests__/DI.test.ts

import DI from '../DI';
import { Dependency } from '../types';

describe('DI', () => {
  it('should have initialValues before initialization', () => {
    const PostsRepository = DI.getDependency(Dependency.POSTS_REPOSITORY);
    expect(PostsRepository).toMatchSnapshot(Dependency.POSTS_REPOSITORY);

    const ToastNotificationService = DI.getDependency(
      Dependency.TOAST_NOTIFICATION_SERVICE,
    );
    expect(ToastNotificationService).toMatchSnapshot(
      Dependency.TOAST_NOTIFICATION_SERVICE,
    );
  });

  it('should register dependency successfully', () => {
    const dependencyKey = 'dependency-key';

    const createDependency = jest.fn(() => ({
      uniqueDependencyKey: dependencyKey,
      uniqueMethod: jest.fn(),
    }));

    // @ts-ignore (ignore type-check since no reason to register real dependency)
    DI.registerDependency(dependencyKey, createDependency());
    // @ts-ignore (ignore type-check since no reason to register real dependency)
    const dependency = DI.getDependency(dependencyKey) as ReturnType<
      typeof createDependency
    >;

    dependency.uniqueMethod();

    expect.assertions(2);
    expect(dependency.uniqueDependencyKey).toBe(dependencyKey);
    expect(dependency.uniqueMethod).toBeCalledTimes(1);
  });
});
