import { IPostsRepository } from 'src/domains/posts/data/network/IPostsRepository';
import { IToastNotificationService } from 'src/domains/shared/services/notifications/local/toast/IToastNotificationService';

export enum Dependency {
  POSTS_REPOSITORY = 'postsRepository',
  TOAST_NOTIFICATION_SERVICE = 'toastNotificationService',
}

export interface DIContainer {
  [Dependency.POSTS_REPOSITORY]: IPostsRepository;
  [Dependency.TOAST_NOTIFICATION_SERVICE]: IToastNotificationService;
}
