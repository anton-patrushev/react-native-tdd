import { ContainerModule, interfaces } from 'inversify';
import { IPostsRepository } from 'src/domains/posts/data/network/IPostsRepository';
import { POSTS_MODULE_IDENTIFIERS } from 'src/domains/posts/ioc/module.symbols';
import PostsRepository from 'src/domains/posts/data/network/PostsRepository';

const initializePostsModule: interfaces.ContainerModuleCallBack = (bind) => {
  bind<IPostsRepository>(
    POSTS_MODULE_IDENTIFIERS.POSTS_REPOSITORY,
  ).toConstantValue(PostsRepository);
};

export const PostsModule = new ContainerModule(initializePostsModule);
