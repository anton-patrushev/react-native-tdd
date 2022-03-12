import { Container } from 'inversify';
import { container } from 'src/core/ioc/container/container';

import { PostsModule } from 'src/domains/posts/ioc/modules/posts';
import { ToastNotificationsModule } from 'src/domains/shared/ioc/modules/toastNotifications';

export async function initializeDIContainer(): Promise<Container> {
  container.load(PostsModule);
  container.load(ToastNotificationsModule);

  return container;
}
