/* eslint-disable curly */
import { Post } from 'src/posts/data/types/post';

export function mapPostFromNetwork(apiPost: any): Post | null {
  if (typeof apiPost !== 'object') return null;
  if (apiPost?.id === undefined) return null;
  if (typeof apiPost?.title !== 'string') return null;
  if (typeof apiPost?.body !== 'string') return null;

  let mappedId: number;

  if (typeof apiPost.id === 'number') {
    mappedId = apiPost.id;
  } else if (typeof apiPost.id === 'string') {
    mappedId = Number(apiPost.id);

    if (isNaN(mappedId)) return null;
  } else {
    return null;
  }

  return { id: mappedId, title: apiPost.title, body: apiPost.body };
}

export function mapPostsFromNetwork(apiPosts: Array<any>): Array<Post> {
  const mappedPosts = apiPosts.map(mapPostFromNetwork);

  const safeMappedPosts = mappedPosts.filter(Boolean) as Array<Post>;

  return safeMappedPosts;
}
