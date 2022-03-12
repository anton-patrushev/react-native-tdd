import { Container } from 'inversify';
import { PostsModule } from 'src/domains/posts/ioc/module';
import { container } from 'src/core/ioc/container';

export async function initializeDIContainer(): Promise<Container> {
  container.load(PostsModule);

  return container;
}
