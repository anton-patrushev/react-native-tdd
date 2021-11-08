import DI from 'src/core/ioc/DI';
import { Dependency } from 'src/core/ioc/types';

import PostRepository from 'src/domains/posts/data/network/PostsRepository';
import ToastNotificationService from 'src/domains/shared/services/notifications/local/toast/ToastNotifcationService';

export function initializeDIContainer() {
  DI.registerDependency(Dependency.POSTS_REPOSITORY, PostRepository);
  DI.registerDependency(
    Dependency.TOAST_NOTIFICATION_SERVICE,
    ToastNotificationService,
  );
}
